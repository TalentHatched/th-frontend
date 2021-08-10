import React, { useState } from 'react';

import LoginForm from './reusable/login';

const CompanyLogin = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hideWarning, setHideWarning] = useState(true);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    console.log('Company Login Form Submit Clicked');
    if (!userName || !password) {
      setHideWarning(false);
    } else if (password.length < 6) {  // May adjust this based on password requirement
       setHideWarning(false);
    } else {
      setHideWarning(true);
    }
  };

  return (
    <div className='admin-login-form'>
      <h1>Company Login</h1>
      <LoginForm
        onClick={handleSubmit}
        userName={userName}
        password={password}
        onUserNameChange={handleUserNameChange}
        onPasswordChange={handlePasswordChange}
        warning={hideWarning}
      />
    </div>
  );
};

export default CompanyLogin;
