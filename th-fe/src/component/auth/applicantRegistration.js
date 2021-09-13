import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import './applicantRegistration.css';

const ApplicantRegistrationForm = (props) => {
  return (
    <div className='applicant-registration-form'>
      <div>
        <Button startIcon={<KeyboardBackspaceIcon />} >
          Return to dashboard
        </Button>
      </div>
      <h2>New Applicant Form</h2>
      <form>
        <div>
          <label>Applicant Name</label>
          <input type='text' title='name'></input>
        </div>

        <div>
          <label>Date of Birth</label>
          <input type='date' title='name'></input>
        </div>

        <div>
          <label>Grade</label>
          <input type='number' title='grade'></input>
        </div>

        <div>
          <label>Specialization</label>
          <input type='text' title='specialization'></input>
        </div>

        <div>
          <label>Username</label>
          <input type='text' title='username'></input>
        </div>

        <div>
          <label>Password</label>
          <input
            type='
                password'></input>
        </div>
        <Button variant='contained' color='primary' size='large'>
          Create Applicant Account
        </Button>
      </form>
    </div>
  );
};

export default ApplicantRegistrationForm;
