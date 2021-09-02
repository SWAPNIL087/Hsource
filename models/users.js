const mongoose =require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    "email":{
        type:String
    },
    "password":{
        type:String
    },
    "docName":{
        type:String
    },
    "description":{
        type:String
    },
    "profileURL":{
        type:String
    },
    "clinicURL":{
        type:String
    },
    "State":{
        type:String
    },
    "city":{
        type:String
    },
    "street":{
        type:String
    },
    "features":[String],
    "slot":[Number]
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password = bcrypt.hashSync(this.password,12);
    }
    next();
})


const users = mongoose.model('USER',userSchema)

module.exports = users;