import React from 'react'
import noteContext from "../context/notes/NoteContext"
import { useContext, useState } from "react";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote  } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        //e.preventDefault() is used so that page does not reload every time
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: " ", description: " ", tag: " "})
       
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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                       <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag"  value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>
               {/* Here in button what we do is that ki WE disabled the button if our input lenth is less that 5 but the question is that  as we already  specify min length in input field that why we have to give it in button , the reason is that  here we are using onClick function , instead of this if we use onSubmit function then we don't need to apply disabled property here , only input field command will get work */}
                    <button  disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
