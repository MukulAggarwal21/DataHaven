import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: " ", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();

  const handleSumit = async (e) => {
    e.preventDefault();
    //destructing use heere
    const { name, email, password } = credentials;
    // fetch()
    const response = await fetch("http://localhost:5000/api/auth/CreateUser", {

      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token and useNavigate 
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success")

    }
    else {
      props.showAlert("Invalid Credentials", "danger")

    }
  }

  const onChange = (e) => {
    // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it. 
    //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value. 
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
   <div className=' container mt-2'>
        <h2>Create an Account to use iNotebook</h2>
      <form onSubmit={handleSumit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSumit}>Submit</button>
      </form>

    </div>
  )
}

export default Signup
