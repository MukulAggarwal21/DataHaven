import React, { useEffect, useRef } from 'react'
import { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes , editNote} = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);

    const [note, setNote] = useState({ etitle: "", edescription: " ", etag: " " })

    const updateNote = (currentNote) => {
        // Js to use Modal
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("Updating the note...", note)
        //e.preventDefault() is used so that page does not reload every time
        e.preventDefault();
    }
    const onChange = (e) => {
        // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it. 
        //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value. 
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button"  className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* We will put Add note like form here  */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag " value={note.etag} onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button  onClick={updateNote} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your  Note</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
