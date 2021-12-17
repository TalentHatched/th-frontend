import React, { useState, useEffect } from "react";
import "./navBar.css";

import { Button } from "@material-ui/core";

const NavBar = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);
  const logout = () => {
    setIsLogin(false);
    const currentUserType = localStorage.getItem("userTypeId").toString();
    switch (currentUserType) {
      case "1":
        window.location.href = "/#/applicantlogin";
        break;
      case "2":
        window.location.href = "/#/companylogin";
        break;
      case "3":
        window.location.href = "/#/adminlogin";
        break;
      case "4":
        window.location.href = "/#/superuserlogin";
        break;
      default:
        console.log("Logout unsuccessful");
        break;
    }
    localStorage.clear();
    props.setLoginStatus(false);
  };

  return (
    <div className='navBar'>
      <nav>
        <a href='/'>
          <img
            src='th-logo.jpg'
            className='th-logo'
            alt='Talent Hatched Logo'></img>
        </a>
      </nav>
      {props.isLogin ? (
        <Button variant='outlined' onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
