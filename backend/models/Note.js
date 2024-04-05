const mongoose = require('mongoose');
const Schema = mongoose.Schema


const NotesSchema = new Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },

   title: {
      type: String,
      required: true
   },

   description: {
      type: String,
      required: true,

   },

   tag: {
      type: String,
      default: "General"
   },
   date: {
      type: Date,
      // default: "true"
        default: Date.now 
   }



});

module.exports = mongoose.model('notes', NotesSchema)