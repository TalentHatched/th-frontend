import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const LastQuestion = (props) => {
  const [adjectives, setAdjectives] = useState("");

  useEffect(() => {
    if (props.adjectivesData) {
      setAdjectives(props.adjectivesData);
    }
  },[]);

  const handleChange = (event) => {
    console.log('eve?', event)
    setAdjectives(event.target.value);
  };
  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.handleReturnClick("ADDITIONAL_QUESTION");
          }}></Button>
      </div>
      <div>
        <h1>Last but not least...</h1>
        <h2>Which three adjectives best describe yourself?</h2>
      </div>
      <div>
        <input
          type='text'
          placeholder='Type your three adjectives here'
          value={adjectives}
          onChange={handleChange}></input>
      </div>
      {props.isUpdate ? (
        <Button
          color='primary'
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          onClick={() => props.lastQuestionContinueClick(adjectives, 'update')}>
          Update Adjectives
        </Button>
      ) : (
        <Button
          color='primary'
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          onClick={() => props.lastQuestionContinueClick(adjectives, 'onboard')}>
          Continue
        </Button>
      )}
    </div>
  );
};

export default LastQuestion;
