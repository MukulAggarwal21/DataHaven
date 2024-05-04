import React, { useState } from 'react'
//REMEMBER INSTEAD OF USEHISTORY , NOWADAYS REACT-ROUTER-DOM SUPPORTS useNavigate
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSumit = async (e) => {
        e.preventDefault();
        // fetch()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth token and useNavigate 
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in  Successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onchange = (e) => {
        // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it. 
        //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value. 
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
        <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSumit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onchange} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} name="password" id="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login




// by chatgpt
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// const Login = (props) => {
//     const [credentials, setCredentials] = useState({ email: "", password: "" });
//     const history = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // fetch()
//         const response = await fetch("http://localhost:5000/api/auth/login", {
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: credentials.email, password: credentials.password })
//         });
//         const json = await response.json();
//         console.log(json);
//         if (json.success) {
//             //save the auth token and useNavigate
//             localStorage.setItem('token', json.authtoken);
//             history.push("/");
//         } else {
//             alert("Invalid Credentials ");
//         }
//     };

//     const onChange = (e) => {
//         // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it.
//         //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value.
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="email">Email address</label>
//                     <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
//                     <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" placeholder="Password" />
//                 </div>

//                 <button type="submit" className="btn btn-primary" >Submit</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
