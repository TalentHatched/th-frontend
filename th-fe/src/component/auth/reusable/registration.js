import React from "react";

import "./registration.css";
import { Button, TextField } from "@material-ui/core";

const RegistrationForm = (props) => {
  return (
    <div className='registration-form'>
      <h2>Create Account</h2>
      {props.submitWarning && <h4>{props.submitWarning}</h4>}

      <form>
        <div className='reg-input'>
          {/* <label>{props.nameLabel}</label>
          <input type='text' title='name' onChange={props.onNameChange}></input> */}
          <TextField
            type='text'
            variant='outlined'
            label='Name of school or organization'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onNameChange}
          />
          {props.nameWarning && (
            <h4 className='warning'>{props.nameWarning}</h4>
          )}
        </div>

        <div>
          {" "}
          <TextField
            type='text'
            variant='outlined'
            label='Contact Person First Name'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onFirstNameChange}
          />
        </div>
        <div>
          <TextField
            type='text'
            variant='outlined'
            label='Contact Person Last Name'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onLastNameChange}
          />
        </div>

        {/* <div>
          <label>Contact Person</label>
          <input
            type='text'
            title='contactPerson'
            onChange={props.onContactPersonChange}></input>
          {props.contactPersonWarning && (
            <h4 className='warning'>{props.contactPersonWarning}</h4>
          )}
        </div> */}
        <div>
          <TextField
            type='text'
            variant='outlined'
            label='Email'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onEmailChange}
          />
          {/* <label>Email</label>
          <input
            type='text'
            title='email'
            onChange={props.onEmailChange}></input> */}
          {props.emailWarning && (
            <h4 className='warning'>{props.emailWarning}</h4>
          )}
        </div>
        <div>
          <TextField
            type='password'
            variant='outlined'
            label='Password'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onPasswordChange}
          />
          {/* <label>Password</label>
          <input
            type='password'
            title='password'
            onChange={props.onPasswordChange}></input> */}
          {props.passwordWarning && (
            <h4 className='warning'>{props.passwordWarning}</h4>
          )}
        </div>
        <div>
          <TextField
            type='password'
            variant='outlined'
            label='Confirm Password'
            style={{ marginTop: "20px", maxWidth: "850px" }}

            onChange={props.onConfirmPasswordChange}
          />
          {/* <label>Confirm Password</label>
          <input
            type='password'
            title='confirmPassword'
            onChange={props.onConfirmPasswordChange}></input> */}
          {props.confirmPasswordWarning && (
            <h4 className='warning'>{props.confirmPasswordWarning}</h4>
          )}
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          style={{ marginTop: "20px", maxWidth: "850px" }}

          onClick={() => props.onClick()}>
          Create Account
        </Button>
      </form>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.snackBarOpen}
        autoHideDuration={6000}
        message='Registration successful'></Snackbar> */}
    </div>
  );
};

export default RegistrationForm;
