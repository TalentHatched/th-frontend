import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./reusable/login";
import ForgetPassword from "./reusable/forgetPassword";
import "./adminLogin.css";
import adminLoginImage from "../../img/admin-login-img.png";

const AdminLogin = ({ history, ...props }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hideWarning, setHideWarning] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const userTypeId = 3;
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage("LOGIN");
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    console.log("Company Login Form Submit Clicked");
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
            console.log("Success");
            localStorage.setItem("token", res.data.userToken);
            localStorage.setItem("userId", res.data.userInfo.id);
            localStorage.setItem("userTypeId", res.data.userInfo.userTypeId);
            history.push("/dashboard3");
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

  const resetPasswordClick = () => {
    setCurrentPage("FORGET_PASSWORD");
  };

  const returnToLogin = ()=> {
    setCurrentPage("LOGIN")
  }

  return (
    <div className='admin-login-form'>
      {currentPage === "LOGIN" ? (
        <div>
          <div className='login-form'>
            <h2 className='login-header'>Administrator Log In</h2>
            <LoginForm
              onClick={handleSubmit}
              userName={userName}
              password={password}
              onUserNameChange={handleUserNameChange}
              onPasswordChange={handlePasswordChange}
              warning={hideWarning}
              warningMessage={warningMessage}
              userType='admin'
              resetPasswordClick={resetPasswordClick}
            />
          </div>
          <div className='login-image-holder'>
            <div className='login-img'>
              <img src={adminLoginImage}></img>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}

      {currentPage === "FORGET_PASSWORD" ? (
        <ForgetPassword returnToLogin={returnToLogin} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminLogin;
