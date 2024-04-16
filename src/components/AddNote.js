import React from 'react'
import noteContext from "../context/notes/NoteContext"

import { useContext, useState } from "react";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: " ", tag: "default" })
    const handleClick = (e) => {
        //e.preventDefault() is used so that page does not reload every time
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it. 
        //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value. 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note </button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
