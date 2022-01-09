import React, { useState } from "react";
import "./navBar.css";

import { Popover, Button, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
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
    handleClose();
  };

  const onMenuClick = (event) => {
    let userLogin = localStorage.getItem("userId") ? true : false;
    if (userLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setAnchorEl(event.target);
  };

  const onMenuItemClick = (type) => {
    switch (type) {
      case "AdminReg":
        window.location.href = "/#/adminregister";
        break;
      case "AdminLogin":
        window.location.href = "/#/adminlogin";
        break;
      case "ApplicantLogin":
        window.location.href = "/#/applicantlogin";
        break;
      default:
        window.location.href = "/#/adminlogin";
        break;
    }

    handleClose();
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
      <Button endIcon={<MenuIcon />} onClick={onMenuClick}></Button>

      {isLogin ? (
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <MenuItem onClick={logout} style={{ padding: "10px 20px" }}>
            Logout
          </MenuItem>
        </Popover>
      ) : (
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <MenuItem onClick={() => onMenuItemClick("AdminReg")}>
            Register
          </MenuItem>
          <MenuItem onClick={() => onMenuItemClick("AdminLogin")}>
            Admin Login
          </MenuItem>
          <MenuItem onClick={() => onMenuItemClick("ApplicantLogin")}>
            Applicant Login
          </MenuItem>
        </Popover>
      )}
    </div>
  );
};

export default NavBar;
