import React, { useState, useEffect } from "react";

import { Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import finalImg from "../../../img/last-question-img.png";

const LastQuestion = (props) => {
  const [adjectives, setAdjectives] = useState("");

  useEffect(() => {
    if (props.adjectivesData) {
      setAdjectives(props.adjectivesData);
    }
  }, [props.adjectivesData]);

  const handleChange = (event) => {
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
      <img src={finalImg} alt='final screen' id='final-img' />
      <div className='prompt-instruction instruction '>
        <div>
          <h2>Last but not least...</h2>
          <h2>Which three adjectives best describe yourself?</h2>
        </div>
        <div>
          <TextField
            variant='outlined'
            multiline
            rows={2}
            type='text'
            placeholder='Type your three adjectives here'
            value={adjectives}
            style={{ width: "100%", minHeight: "70px" }}
            onChange={handleChange}></TextField>
        </div>
        {props.isUpdate ? (
          <Button
            color='primary'
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() =>
              props.lastQuestionContinueClick(adjectives, "update")
            }>
            Update Adjectives
          </Button>
        ) : (
          <Button
            color='primary'
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() =>
              props.lastQuestionContinueClick(adjectives, "onboard")
            }>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default LastQuestion;
