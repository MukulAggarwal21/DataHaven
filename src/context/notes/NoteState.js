import React, { useState } from "react";
import NoteContext from './NoteContext';


const NoteState = (props) => {
  const host = "http://localhost:5000"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZGIxMmExMzAyNTRlODM0NGRlNDQ4In0sImlhdCI6MTcxMjM0MDA5NH0.pqmcWsH7JvDDq4PcXestYrWyaBIz6bk9Z9LF8QSvjK0"
      },

    });
    const json = await response.json()
    console.log(json)
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZGIxMmExMzAyNTRlODM0NGRlNDQ4In0sImlhdCI6MTcxMjM0MDA5NH0.pqmcWsH7JvDDq4PcXestYrWyaBIz6bk9Z9LF8QSvjK0"
      },
      body: JSON.stringify({ title, description, tag })  // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects


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
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZGIxMmExMzAyNTRlODM0NGRlNDQ4In0sImlhdCI6MTcxMjM0MDA5NH0.pqmcWsH7JvDDq4PcXestYrWyaBIz6bk9Z9LF8QSvjK0"
      },
     
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
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
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZGIxMmExMzAyNTRlODM0NGRlNDQ4In0sImlhdCI6MTcxMjM0MDA5NH0.pqmcWsH7JvDDq4PcXestYrWyaBIz6bk9Z9LF8QSvjK0"
      },
      body: JSON.stringify({ title, description, tag })  // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects


    //Logic to edit in call
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;