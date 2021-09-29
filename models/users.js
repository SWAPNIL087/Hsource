const mongoose =require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    "opening":{
        type:String
    },
    "closing":{
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
    
    "slot":[Number],
    
    "Booking":[{
        "name":{type:String},
        "email":{type:String},
        "contact":{type:String},
        "slotOpen":{type:String},
        "slotClose":{type:String},
        "slotID":{type:String},
        "date":{type:String},
        "attented":{
            type: String, 
            enum : ['yes','no','-'], 
            default: '-' 
        },
        "Disease":{type:String},
    }],

    tokens:[{
        token:{
            type:String
        }
    }]
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password = bcrypt.hashSync(this.password,12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);

    }
}

const users = mongoose.model('USER',userSchema)

module.exports = users;