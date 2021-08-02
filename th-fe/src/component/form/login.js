import React from 'react';
import './login.css';

// import {Button} from "react-bootstrap"
import {Button} from "@material-ui/core"

const Login = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input type='text' title='userName' placeholder='Username'></input>
      </div>
      <div>
        <label>Password</label>
        <input type='password' title='userPassword' placeholder='Password'>
          
        </input>
      </div>
      <Button variant="contained" class="login-btn">Login</Button>

    </div>
  );
};

export default Login;
