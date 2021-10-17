import React from "react";

import { Button } from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ParentContactScreen = (props) => {
  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("WELCOME")}></Button>
      </div>
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
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.handleParentContactClick()}>
          Enter name and email
        </Button>
      </div>
    </div>
  );
};

export default ParentContactScreen;
