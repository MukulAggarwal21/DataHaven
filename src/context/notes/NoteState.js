import React, { useState } from "react";
import NoteContext from './NoteContext';


const NoteState = (props) => {
  const host = "http://localhost:3000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  //Get All  Note
  const getNotes = async (title, description, tag) => {
    // aPI call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },

    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }


  //Add a Note
  const addNote = async (title, description, tag) => {
    // aPI call
    //Add Note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })  // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note))    //Here we use concact instead of push bcoz  using concat a new array is returned
    console.log("Adding a new Note")
  }


  
  //Delete a Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },

    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)



    console.log("Deleting the Note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note 
  const editNote = async (id, title, description, tag) => {
    //API CALL
    //In fetch we have written the URL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })  // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in call
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;