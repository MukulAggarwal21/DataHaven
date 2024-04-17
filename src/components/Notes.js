import React, { useEffect } from 'react'
import { useContext} from "react";
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
   useEffect(() => {
       getNotes()
   },[]) 
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your  Note</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
