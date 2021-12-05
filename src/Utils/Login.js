import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://ec2-13-232-74-29.ap-south-1.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/Authenticate/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json()
  )
 }
 
export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    console.log(response)
  }

    const handleLogin = () => {
        console.log("in handle login" + username + password)
        axios.post(`http://ec2-13-232-74-29.ap-south-1.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/Authenticate/user`,
        {
            "username": username,
            "password": password,
        })
        .then(response => {
            console.log(response)
            // console.log(this.state.appointmentsList)
            history.push({
              pathname: '/dashboard',
            });

        })
        .catch(error => {
            console.log(error)
        })

          }
      
  
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
              <div className="form-div">
                <div className="col-div">
                  <label>Username</label>
                  <input type="text" onChange={e => setUserName(e.target.value)}/>
                </div>
                
                <div className="col-div">
                  <label>Password</label>
                  <input type="text" onChange={e => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Submit" />
              </div>
            </form>
        </div>
      )
}
