import React, { useState } from "react";

import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const LastQuestion = (props) => {
  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.handleReturnClick("ADDITIONAL_QUESTION");
          }}></Button>
      </div>
      <div>
        <h1>Last but not least...</h1>
        <h2>Which three adjectives best describe yourself?</h2>
      </div>
      <div>
        <input
          type='text'
          placeHolder='Type your three adjectives here'></input>
      </div>
      <Button
        color='primary'
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.lastQuestionContinueClick()}>
        Continue
      </Button>
    </div>
  );
};

export default LastQuestion;
