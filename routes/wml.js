const express = require("express");
const router = express.Router();
const request = require("request-promise");
const utils = require("../utils/utils");
const fields = utils.fields;

router.post("/score", async (req, res) => {
    //console.log('req recieved');
    console.log(req.body)
    var tem_data = req.body.body;
    var template = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    const n = tem_data.length;
    for (var i=0;i<n;i++){
      var x = tem_data[i].name;
      for(var j=0;j<fields.length;j++){
        if(x==fields[j]){
          template[j]=1
        }
      }
    }
    console.log(template)
    console.log(process.env.AUTH_URL)
    const options = {
      method: "POST",
      url: process.env.AUTH_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        apikey: process.env.WML_API_KEY,
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      },
    };
  
    let response = "";
    let access_token = "";
    try {
      response = await request(options);
      access_token = JSON.parse(response)["access_token"];
      //res.send(access_token);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    
    const scoring_options = {
        method: "POST",
        url: process.env.WML_SCORING_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          "ML-Instance-ID": process.env.WML_INSTANCE_ID,
        },
        
        body:JSON.stringify({
            input_data: [{
                fields:fields ,
                values: [template]
            }]
        })
      };
    //   var sample ={
    //     input_data: [{
    //         fields:fields ,
    //         values: [template]
    //     }]
    // }
    // console.log(sample)
    // console.log('--------------------------------------------------')

      let scoring_response = "";
      try {
        scoring_response = await request(scoring_options);
        const disease = (JSON.parse(scoring_response)["predictions"][0]["values"][0][0])
        res.send(disease);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
  });

module.exports = router;