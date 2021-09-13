const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const schedule = require('node-schedule')
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: process.env.Nodemailer_USER, 
        pass: process.env.Nodemailer_PASS
    } 
}); 

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
    const{startime,endtime,date,patient,email,contact,slot_id,slot_no,id,disease,name} = req.body.body

    console.log(req.body.body)
    console.log(slot_id)
    const slot_preBooked = await User.find({
        Booking:{
            $elemMatch:{slotID:slot_id}
        }}
    )
    console.log(slot_preBooked)
    if(slot_preBooked.length==0){
        const data = await User.find({
            Booking:{
                $elemMatch:{email:email,date:date}
            }
        })
    
        console.log(data)
        if(data.length==0){
            console.log('no record found book a slot')
            var newData = {
                name:patient,
                email:email,
                contact:contact,
                slotOpen:startime,
                slotClose:endtime,
                slotID:slot_id,
                date:date,
                Disease:disease
            }
            User.findByIdAndUpdate(
                id,
                {
                    $push:{
                        "Booking":newData
                    }
                },
                {safe:true,upset:true},
                function(err,model){
                    console.log(err)
                }
            )
            
            console.log("sucess")
            // send an confirmation email to the email id recieved!
            var msg = "Hi, "+patient+" this is a remainder for your appointment at "+name+" on "+date+", "+startime+"."
            let mailDetails = { 
                from: 'swapniltiwari2524@gmail.com', 
                to: email, 
                subject: 'Appointment Reminder', 
                text: msg
            }; 
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    throw err; 
                } else { 
                    console.log('Email sent successfully'); 
                }
            }) 

            //schedule another remainder an hour before actual appointment
            

            res.send("Slot booked you will shortly recieve a confirmation email.")
        }
        else{
            console.log('repeated User')
            res.send('You have already booked an appointment this day with this email.')
        }
    }
    
    else{
        console.log('overlap')
        res.send('This Slot is already Booked!')
    }

})


module.exports = router;