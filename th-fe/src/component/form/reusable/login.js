import React from 'react';
import './login.css';

// import {Button} from "react-bootstrap"
import { Button } from '@material-ui/core';

const LoginForm = (props) => {
  return (
    <div className='login-form'>
      <label>Login</label>
      <form>
        <div>
          <label>Username</label>
          <input type='text' title='userName' placeholder='Username' onChange={props.onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            title='userPassword'
            placeholder='Password'
            onChange={props.onChange}></input>
        </div>
        {/* <Button variant='contained' color='primary' size='large'>
          Login
        </Button> */}
      </form>
    </div>
  );
};

export default LoginForm;
