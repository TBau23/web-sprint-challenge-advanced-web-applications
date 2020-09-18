import React, { useState} from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialValues = {
    username: "",
    password: ""
  }

  const[formValues, setFormValues] = useState(initialValues)
  const history = useHistory()
  

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault()

    axiosWithAuth()
      .post("/api/login", formValues)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push("/bubblepage")
      })
      .catch(error => {
        console.log(error)
      })
  }



  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <label>Username &nbsp;
          <input
          type='text'
          name='username'
          value={formValues.username}
          onChange={handleChange}

          />
        </label>

        <label> Password &nbsp;
          <input
          type='password'
          name='password'
          value={formValues.password}
          onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
