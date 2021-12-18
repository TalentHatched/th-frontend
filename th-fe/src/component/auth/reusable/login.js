import React, { useState } from "react";
import "./login.css";

// import {Button} from "react-bootstrap"
import { Button, CircularProgress, TextField } from "@material-ui/core";

const LoginForm = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const onLoginClick = () => {
    setInProgress(true);
    props.onClick(props.userName, props.password);
  };

  const onForgotPasswordClick = () => {
    console.log("forgot password");
  };
  return (
    <div className='login-form'>
      <h4 hidden={props.warning}>{props.warningMessage}</h4>
      <form>
        <div>
          <TextField
            type='text'
            title='userName'
            label='Username'
            placeholder='Username'
            variant='outlined'
            style={{ marginTop: "20px", maxWidth: "850px" }}
            onChange={props.onUserNameChange}></TextField>
        </div>
        <div>
          <TextField
            id='password-field'
            type='password'
            title='userPassword'
            placeholder='Password'
            label='Password'
            variant='outlined'
            onChange={props.onPasswordChange}
            style={{ marginTop: "20px", maxWidth: "850px", textAlign: "left" }}
            value={props.password}></TextField>
        </div>
        <h4 onClick={() => onForgotPasswordClick()}>Forgot Password?</h4>
        <Button
          variant='contained'
          color='primary'
          size='large'
          style={{ marginTop: "50px", textAlign: "left" }}
          onClick={() => onLoginClick()}>
          Login
        </Button>
        {inProgress && props.warning ? <CircularProgress /> : ""}
      </form>
    </div>
  );
};

export default LoginForm;
