import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: " ", email: "", password: "", cpassword: "" })
  const history = useNavigate();

  const handleSumit = async (e) => {
    e.preventDefault();
    //destructing use heere
    const { name, email, password } = credentials;
    // fetch()
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

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
      history.push("/");
      props.showAlert("Account Created Successfully", "success")

    }
    else {
      props.showAlert("Invalid Credentials", "danger")

    }
  }

  const onchange = (e) => {
    // In this, we did that whatever is the old note should be there and whatever you write should be overwritten or added to it. 
    //  [e.target.name]: e.target.value  :: This means that the name of whatever is changing becomes equal to its value. 
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <form onSubmit={handleSumit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onchange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onchange={onchange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onchange={onchange} minlength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onchange={onchange} minlength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup
