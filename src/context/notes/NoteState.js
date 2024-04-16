import React, { useState } from "react";
import NoteContext from './NoteContext';


const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "661061e70d240b5c10c69804",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "__v": 0,
      "date": "2024-04-14T19:47:09.839Z"
    },
    {
      "_id": "661062f45dacf74dbd4a6e6d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    },
    {
      "_id": "661062f45dacf74dbd4a6e61d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    },
    {
      "_id": "661062f45dacf74dbd42a6e6d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    },
    {
      "_id": "661062f45dacf74dbd14a6e6d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    },
    {
      "_id": "661062f45dacf74db5d4a6e6d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    },
    {
      "_id": "661062f45dacf724dbd4a6e6d",
      "user": "660db12a130254e8344de448",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  //Add a Note
  const addNote = (title, description, tag) => {
    //TODO aPI call
    console.log("Adding a new Note")
    const note = {
      "_id": "6uj61062f45dacf724dbd4a6e6d",
      "user": "660db12a130254e8344de448",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-04-05T20:45:40.782Z",
      "__v": 0
    }
    //Here we use concact instead of push bcoz  using concat a new array is returned
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = (id) => {
    console.log("Deleting the Note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note 
  const editNote = (id , title , description , tag ) => {
    
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;