import React from "react";

import { Button } from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import WelcomeScreenImg from "../../../img/welcome-screen-img.png"


const WelcomeScreen = (props) => {
  return (
    <div>
      <h1>Hello, {props.firstName}!</h1>

      <h1>Welcome!</h1>
      <img src={WelcomeScreenImg}></img>
      <section>
        <h2>
          You're the newest member of <br></br>
          <strong>Talent Hatched!</strong>
        </h2>
        <br></br>
        <br></br>
        <h2>Ready to set up your profile?</h2>
        <Button
          variant='contained'
          color='primary'
          endIcon={<ArrowForwardIcon />}
          onClick={() => props.handleStartClick()}>
          I'm ready
        </Button>
      </section>
    </div>
  );
};

export default WelcomeScreen;
