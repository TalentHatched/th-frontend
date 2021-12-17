import React, { useState } from "react";
import "./login.css";

// import {Button} from "react-bootstrap"
import { Button, CircularProgress } from "@material-ui/core";

const LoginForm = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const onLoginClick = () => {
    setInProgress(true);
    props.onClick(props.userName, props.password);
  };


  const onForgotPasswordClick = () => {
    console.log('forgot password')
  }
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
        <h4 onClick={()=> onForgotPasswordClick()}>Forgot Password?</h4>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={() => onLoginClick()}>
          Login
        </Button>
        {inProgress && props.warning ? <CircularProgress /> : ""}
      </form>
    </div>
  );
};

export default LoginForm;
