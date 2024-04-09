const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1 : Get All the Notes using  : GET "/api/notes/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server ERROR");
   }


})

// Route 2 :Add a new Note using  : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
   body('title', ' Enter a valid Title').isLength({ min: 3 }),
   body('description', ' Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

   try {

      const { title, description, tag } = req.body;
      //If there are error , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()

      res.json(savedNote)


   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server ERROR");
   }
})


// Route 3 :Update  a Existing  Note using  : POST "/api/notes/updatenode". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   //Create a newNode Object 
   const newNote = {};
   if (title) { newNote.title = title };
   if (description) { newNote.descriptin = description};
   if (tag) { newNote.tag = tag };

   //Find the Note to be Updated and Update it 
   let note = await Note.findById(req.params.id);
   if(!note){return res.status(404).send("Not Found")}

   if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

   note = await Note.findByIdAndUpdate(req.params.id , { $set: newNote} , {new: true} ) 
   res.json({note});
})

module.exports = router 