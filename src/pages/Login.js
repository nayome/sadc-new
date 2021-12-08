import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {ReactSession} from 'react-client-session';
import { setUserSession } from '../Utils/Common';
import { useAppContext } from "../lib/contextLib";

async function loginUser(credentials) {
 console.log(credentials)
  return fetch('https://ec2-13-232-74-29.ap-south-1.compute.amazonaws.com:443/ws/rest/IntegrationAPI/Authenticate/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json()
  )
 }

 const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

 
export default function Login(props) {
  const { userHasAuthenticated } = useAppContext();
const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const username = useFormInput('');
  const password = useFormInput('');
  const history = useHistory();
  ReactSession.setStoreType("localStorage");

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
   const response = await loginUser({ username: username.value, password: password.value });
    console.log(response)
    if(response.authenticated == "true")
    {
      setLoading(false);
      setUserSession(response.token,response.username);
      userHasAuthenticated(true);
      console.log(props)
      // props.history.push('/calendar');
      history.push({
        pathname: '/calendar',
      });
    }
    else {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  }


  return (
        <div className="login">
            <form onSubmit={handleSubmit}>
              <div className="form-div">
                <div className="col-div">
                  <label>Username</label>
                  <input type="text" {...username} autoComplete="new-password" />
                </div>
                
                <div className="col-div">
                  <label>Password</label>
                  <input type="password" {...password} autoComplete="new-password" />
                </div>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                 <input type="submit" value={loading ? 'Loading...' : 'Login'} disabled={loading} /><br />
              </div>
            </form>
        </div>
      )
}
