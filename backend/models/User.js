const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
       type:String,
       required: true
    },
  
  email:{
       type:String,
       required: true,

      

    },
  
    password: {
       type:String,
       required: true
    },
   //  date:{
   //     type: Date,
   //     required: true , 
   //     default:true 
   //  }
  
});

//ye niche ki line change krne pr data uniw=que jana chaiye tha par ab same jaa rha hai  and auth wale me user.create bhi daala hai 

const User = mongoose.model('user', UserSchema )
User.createIndexes();
module.exports = User