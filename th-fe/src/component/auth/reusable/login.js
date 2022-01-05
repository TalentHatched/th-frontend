import React, { useState } from "react";
import "./login.css";

// import {Button} from "react-bootstrap"
import { Button, CircularProgress, TextField, Paper } from "@material-ui/core";

const LoginForm = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState("");
  const onLoginClick = () => {
    setInProgress(true);
    props.onClick(props.userName, props.password);
  };

  const onForgotPasswordClick = () => {
    if (props.userType === "applicant") {
      setPasswordWarning("Please contact your administrator.");
    } else if (props.userType === "admin") {
      props.resetPasswordClick();
    }
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
        <div class='forget-password-container'>
          <Button
            elevation={0}
            id='forget-password'
            variant='text'
            onClick={() => onForgotPasswordClick()}>
            Forgot Password?
          </Button>
        </div>
        {passwordWarning !== "" ? <h4>{passwordWarning}</h4> : ""}
        <Button
          variant='contained'
          color='primary'
          size='large'
          style={{ marginTop: "20px", textAlign: "left" }}
          onClick={() => onLoginClick()}>
          Login
        </Button>
        {inProgress && props.warning ? <CircularProgress /> : ""}
      </form>
    </div>
  );
};

export default LoginForm;
