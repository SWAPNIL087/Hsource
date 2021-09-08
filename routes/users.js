const express = require("express");
const router = express.Router();

const User = require('../models/users')

router.post('/login',async(req,res)=>{
    console.log('login credentials recieved')
    console.log(req.body.body);
    res.send('success')
})

router.post('/register',async(req,res)=>{
    console.log('registration details');
    console.log(req.body);
    const{email,password,State,city,street,docName,profileURL,description,clinicURL,features,slot,opening,closing} = req.body.body;
    try{
        const userExists = await User.findOne({email:email})

        if(userExists){
            console.log('repeated user')
            res.send('failure')
            return res.status(422).json({error:'User already exists!'})
        }
        
        const user = new User({email,password,docName,description,profileURL,clinicURL,opening,closing,State,city,street,features,slot});
        
        //hashing here
        await user.save();

        res.status(201).json({message:'User registered successfuly'})
        
    }

    catch (err){
        console.log(err);
    }
})

router.get('/List_of_Clinics',async(req,res)=>{
    const data = await User.find()
    console.log(data)
    res.send(data)
})

router.post('/suggested_clinics',async(req,res)=>{
    var disease = req.body.body.disease
    var city = req.body.body.city
    const data = await User.find({features: disease,city:city})
    console.log(data)
    res.send(data)
})

router.post('/Clinic_with_diseasename',async(req,res)=>{
    var disease = req.body.body.disease
    var city = req.body.body.city
    const data = await User.find({features: disease,city:city})
    console.log(data)
    res.send(data)
})

router.post('/clinic_details',async(req,res)=>{
    //console.log("request for clinic details recieved",req.body.body.id)
    const data = await User.find({_id:req.body.body.id})
    // console.log(data[0].opening)
    res.send(data)
})

router.post('/Book_a_slot',async(req,res)=>{
    console.log('booking details recieved now checking availablility')
    console.log(req.body.body)
})


module.exports = router;