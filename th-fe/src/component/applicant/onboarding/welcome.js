import React from "react";

import { Button } from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import WelcomeScreenImg from "../../../img/welcome-screen-img.png";

const WelcomeScreen = (props) => {
  return (
    <div>
      <h1>Hello, {props.firstName}!</h1>

      <h1>Welcome!</h1>
      <img id="welcome-img" src={WelcomeScreenImg} alt='welcome'></img>
      <div className='welcome-text'>
        <h2>
          You're the newest member of <br></br>
          <strong>Talent Hatched!</strong>
        </h2>
        <br></br>
        <br></br>
        <h2>Ready to set up your profile?</h2>
      </div>

      <Button
        id='welcome-button'
        variant='contained'
        color='primary'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.handleStartClick()}
        style={{
          width:"50%",
          padding: " 10px 45%",
          margin: "30px 0px",
          whiteSpace: "nowrap",
          fontSize: "16px",
        }}>
        I'm ready
      </Button>
    </div>
  );
};

export default WelcomeScreen;
