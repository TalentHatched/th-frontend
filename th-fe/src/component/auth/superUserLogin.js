import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './reusable/login';

const SuperUserLogin = ({ history, ...props }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hideWarning, setHideWarning] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');
  const userTypeId = 4;

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    console.log('Company Login Form Submit Clicked');
    if (!userName || !password) {
      setWarningMessage('Username and Password are required.');
      setHideWarning(false);
    } else if (password.length < 6) {
      // May adjust this based on password requirement
      setWarningMessage('Invalid password.');

      setHideWarning(false);
    } else {
      setHideWarning(true);
      const credential = {
        userEmail: userName,
        userPassword: password,
        userTypeId: userTypeId,
      };
      axios
        .post('http://localhost:8081/api/user/login', credential)
        .then((res) => {
          if (res.data) {
            console.log('Success');
            localStorage.setItem('token', res.data.userToken);
            localStorage.setItem('userId', res.data.userInfo.id);
            localStorage.setItem('userTypeId', res.data.userInfo.userTypeId);
            history.push('/dashboard4');
          }
        })
        .catch((err) => {
          console.log('err', err);
          console.log(typeof err);
          console.log(err.response);
          if (!err.response) {
            setWarningMessage('Server error. Please try again.');
            setHideWarning(false);
          } else {
            if (err.response.status === 400 || err.response.status === 404) {
              setWarningMessage('Invalid credentials.');
              setHideWarning(false);
            } else {
              setWarningMessage('Login Unsuccessful. Please try again.');
              setHideWarning(false);
            }
          }
        });
    }
  };

  return (
    <div className='superuser-login-form'>
      <h1>SuperUser Login</h1>
      <LoginForm
        onClick={handleSubmit}
        userName={userName}
        password={password}
        onUserNameChange={handleUserNameChange}
        onPasswordChange={handlePasswordChange}
        warning={hideWarning}
        warningMessage={warningMessage}
      />
    </div>
  );
};

export default SuperUserLogin;
