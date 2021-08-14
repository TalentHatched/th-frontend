import React from 'react';

import './registration.css';
import { Button, Snackbar } from '@material-ui/core';

const RegistrationForm = (props) => {
  return (
    <div className='registration-form'>
      <h2>Create Account</h2>
      {props.submitWarning && <h4>{props.submitWarning}</h4>}

      <form>
        <div className='reg-input'>
          <label>{props.nameLabel}</label>
          <input type='text' title='name' onChange={props.onNameChange}></input>
          {props.nameWarning && (
            <h4 className='warning'>{props.nameWarning}</h4>
          )}
        </div>
        <div>
          <label>Contact Person</label>
          <input
            type='text'
            title='contactPerson'
            onChange={props.onContactPersonChange}></input>
          {props.contactPersonWarning && (
            <h4 className='warning'>{props.contactPersonWarning}</h4>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            title='email'
            onChange={props.onEmailChange}></input>
          {props.emailWarning && (
            <h4 className='warning'>{props.emailWarning}</h4>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            title='password'
            onChange={props.onPasswordChange}></input>
          {props.passwordWarning && (
            <h4 className='warning'>{props.passwordWarning}</h4>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            title='confirmPassword'
            onChange={props.onConfirmPasswordChange}></input>
          {props.confirmPasswordWarning && (
            <h4 className='warning'>{props.confirmPasswordWarning}</h4>
          )}
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
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
