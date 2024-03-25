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

module.exports = mongoose.model('user' ,  UserSchema )