import React from "react";

import { Button } from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const WelcomeScreen = () => {
  return (
    <div>
      <h2>
        Our data shows that you are under 18. Please provide the name and email
        of a parent or guardian who can provide parental consent to use Talent
        Hatched.
      </h2>
      <label>Name of parent or guardian</label>
      <input type='text'></input>
      <label>Parent or guardian email</label>
      <input type='text'></input>
      <div>
        <Button variant='contained' color='primary'>
          Enter name and email
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
