import React, { useState } from "react";
import axios from "axios";

import LoginForm from "./reusable/login";
import "./applicantLogin.css";
const ApplicantLogin = ({ history, ...props }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hideWarning, setHideWarning] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const userTypeId = 1;

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
      // May adjust this based on password requirement
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
            console.log("Success", res.data);
            localStorage.setItem("token", res.data.userToken);
            localStorage.setItem("userId", res.data.userInfo.id);
            localStorage.setItem("userTypeId", res.data.userInfo.userTypeId);
            history.push("/dashboard1");
            props.setLoginStatus(true);
          }
        })
        .catch((err) => {
          console.log("err", err);
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
    <div className='applicant-login-form'>
      <div className='login-form'>
        <h2 className='login-header'>Applicant Login</h2>
        <div className='applicant-login-form'>
          <LoginForm
            onClick={handleSubmit}
            userName={userName}
            password={password}
            onUserNameChange={handleUserNameChange}
            onPasswordChange={handlePasswordChange}
            warning={hideWarning}
            warningMessage={warningMessage}
            userType='applicant'
          />
        </div>
        <div className='no-account-message'>
          <p>Don't have an account?</p>
          <br></br>
          <p>Contact your school or organization for log in information</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantLogin;
