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
    "_id": "661062f45dacf74dbd4a6e6d",
    "user": "660db12a130254e8344de448",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2024-04-05T20:45:40.782Z",
    "__v": 0
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
    "_id": "661062f45dacf74dbd4a6e6d",
    "user": "660db12a130254e8344de448",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2024-04-05T20:45:40.782Z",
    "__v": 0
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
    "_id": "661062f45dacf74dbd4a6e6d",
    "user": "660db12a130254e8344de448",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2024-04-05T20:45:40.782Z",
    "__v": 0
  }
]
const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;