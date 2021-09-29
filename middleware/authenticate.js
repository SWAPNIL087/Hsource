const jwt = require('jsonwebtoken');
const User = require('../models/users')


const Authenticate = async(req,res,next)=>{

    try{
        console.log('authentification under process!')
        const token = req.cookies.jwtoken;
        console.log(token);
        if(token==undefined){
            console.log('here-->')
            throw new Error('User not found')
            res.send('invalid')
        }

        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);



        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})

        if (!rootUser){
            throw new Error('User not found')
            res.send('invalid')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }
    catch(err){
        res.send('unauthorised')
        console.log(err);
    }
}

module.exports = Authenticate