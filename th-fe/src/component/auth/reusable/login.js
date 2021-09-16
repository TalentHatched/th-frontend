import React from 'react';
import './login.css';

// import {Button} from "react-bootstrap"
import { Button } from '@material-ui/core';

const LoginForm = (props) => {
  return (
    <div className='login-form'>
      <h4 hidden={props.warning}>{props.warningMessage}</h4>
      <form>
        <div>
          <label>Username</label>
          <input
            type='text'
            title='userName'
            placeholder='Username'
            onChange={props.onUserNameChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            title='userPassword'
            placeholder='Password'
            onChange={props.onPasswordChange}
            value={props.password}></input>
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={() => props.onClick(props.userName, props.password)}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
