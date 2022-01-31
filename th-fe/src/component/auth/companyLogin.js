import React, { useState } from "react";
import axios from "axios";

import LoginForm from "./reusable/login";

const CompanyLogin = ({ history, ...props }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hideWarning, setHideWarning] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const userTypeId = 2;

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    if (!userName || !password) {
      setWarningMessage("Username and Password are required.");
      setHideWarning(false);
    } else if (password.length < 6) {
      setWarningMessage("Invalid password.");
      setHideWarning(false);
    } else {
      setHideWarning(true);
      const credential = {
        userEmail: userName,
        userPassword: password,
        userTypeId: userTypeId,
      };
      axios
        .post("api/user/login", credential)
        .then((res) => {
          if (res.data) {
            history.push("/dashboard2");
          }
        })
        .catch((err) => {
          if (!err.response) {
            setWarningMessage("Server error. Please try again.");
            setHideWarning(false);
          } else {
            if (err.response.status === 400 || err.response.status === 404) {
              setWarningMessage("Invalid credentials.");
              setHideWarning(false);
            } else {
              setWarningMessage("Login Unsuccessful. Please try again.");
              setHideWarning(false);
            }
          }
        });
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
        warningMessage={warningMessage}
      />
    </div>
  );
};

export default CompanyLogin;
