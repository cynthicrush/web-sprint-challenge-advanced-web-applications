import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();

  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = (e) => {
    e.preventDefault();
    
    console.log('creds', credentials)
    if ((credentials.username !== 'Lambda School' ) || (credentials.password !== 'i<3Lambd4')) {
      setErrorMessage('Username or Password not valid.');
      console.log('error1', errorMessage);
      return;
    } else {
      setErrorMessage('');
      console.log('error2', errorMessage);
    }

    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        push(`/bubbles`);
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
    });
  };

  // useEffect = ()=>{
  //   // make a post request to retrieve a token from the api
  //   // when you have handled the token, navigate to the BubblePage route
  // };

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <form onSubmit={login}>
          <label>Username
            <input name='username' type='text' value={credentials.username} onChange={handleChange}/>
          </label>
          <label>Password
            <input name='password' type='password' value={credentials.password} onChange={handleChange}/>
          </label>
          <button>Login</button>
          {errorMessage && (<div>{errorMessage}</div>)}
        </form>
      </h1>
    </>
  );
  }
  

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.