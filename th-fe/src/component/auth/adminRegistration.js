import React, { useState } from 'react';
import axios from 'axios';
import RegistrationForm from './reusable/registration';
import './adminRegistration.css';

const AdminRegistration = ({ history, ...props }) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameWarning, setNameWarning] = useState('');
  const [contactPersonWarning, setContactPersonWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');
  const [submitWarning, setSubmitWarning] = useState('');

  //const [snackBarOpen, setSnackBarOpen]=useState(false)
  const nameLabel = 'Name of school or organization';
  const userTypeId = 3;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactPersonChange = (event) => {
    setContactPerson(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (validate()) {
      console.log('CREATE ACCOUNT');
      const credentials = {
        userName: email,
        userEmail: email,
        userPassword: password,
        userTypeId: userTypeId,
        userFullName: name,
        registrationDate: Date.now(),
        isActive: true,
      };
      console.log('CREDS', credentials)
      axios
        .post('http://localhost:8081/api/user/register', credentials)
        .then((res) => {
          console.log('What is res.data', res.data);
         // setSnackBarOpen(true)
          history.push('/adminlogin');
        })
        .catch((err) => {
          console.log('There is an error', err);
          if (err.response) {
            console.log('What is the error', err.response)
            if (err.response.status === 400) {
              setSubmitWarning(err.response.data.message)
            } else {
              setSubmitWarning('Registration unsuccessful. Please try again.')
            }
          }
        });
    } else {
      console.log('NOT READY');
    }
  };

  const validate = () => {
    let readyToSubmit = true;
    setNameWarning('');
    setContactPersonWarning('');
    setEmailWarning('');
    setPasswordWarning('');
    setConfirmPasswordWarning('');

    console.log(
      'Show me the creds',
      name,
      contactPerson,
      email,
      password,
      confirmPassword
    );
    if (!name || !contactPerson || !email || !password || !confirmPassword) {
      readyToSubmit = false;
      if (!name) {
        setNameWarning('Name of school or organization required');
      }

      if (!contactPerson) {
        setContactPersonWarning('Contact Person required');
      }

      if (!email) {
        setEmailWarning('Email required');
      }

      if (!password) {
        setPasswordWarning('Password required');
      }

      if (!confirmPassword) {
        setConfirmPasswordWarning('Confirm Password required');
      }
    } else {
      console.log('password.length', password.length);
      if (!email.includes('@')) {
        setEmailWarning('Please provide a valid email');
        readyToSubmit = false;
      }

      if (password.length < 6) {
        setPasswordWarning('Password must have at least 6 characters');
        readyToSubmit = false;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordWarning('Password does not match');
        readyToSubmit = false;
      }
      let letterNumOnly = /^[A-Za-z0-9]+$/.test(password);
      let letterOnly = /^[A-Za-z]+$/.test(password);
      let numOnly = /^\d+$/.test(password);

      if (numOnly || letterOnly) {
        setPasswordWarning(
          'Password must contain at least 1 number and 1 character'
        );
        readyToSubmit = false;
      } else if (!letterNumOnly) {
        setPasswordWarning('Password can contain letters and numbers only');
        readyToSubmit = false;
      }
    }
    return readyToSubmit;
  };

  return (
    <div className='admin-registration'>
      <RegistrationForm
        name={name}
        contactPerson={contactPerson}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        nameLabel={nameLabel}
        onNameChange={handleNameChange}
        onContactPersonChange={handleContactPersonChange}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onClick={handleSubmit}
        nameWarning={nameWarning}
        contactPersonWarning={contactPersonWarning}
        emailWarning={emailWarning}
        passwordWarning={passwordWarning}
        confirmPasswordWarning={confirmPasswordWarning}
        submitWarning={submitWarning}
        // snackBarOpen={snackBarOpen}
      />
       {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.snackBarOpen}
        autoHideDuration={6000}
        message='Registration successful'></Snackbar> */}
    </div>
  );
};

export default AdminRegistration;
