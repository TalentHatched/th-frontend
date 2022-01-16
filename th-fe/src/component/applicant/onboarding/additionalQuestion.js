import React, { useState, useEffect } from "react";

import { Button, FormGroup, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import moreInfoImg from "../../../img/more-info-img.png";
const AdditionalQuestion = (props) => {
  const [answer, setAnswer] = useState({
    first: { question: "Tell us about what you do for fun", answer: "" },
    second: {
      question:
        "Tell us about a time when you led a team or another individual through a challenging situation",
      answer: "",
    },
    third: {
      question:
        "Tell us about a time when things didn't go to plan. How did you cope?",
      answer: "",
    },
    forth: {
      question:
        "Tell us about a time when you had too much work to do. How did you handle it?",
      answer: "",
    },
    fifth: {
      question:
        "Tell us about a time when someone disagreed with you. What did you do?",
      answer: "",
    },
    sixth: {
      question:
        "Tell us about a time when you didn't receive the outcome you expected. What did you learn from that experience?",
      answer: "",
    },
  });

  useEffect(() => {
    if (Object.values(props.questionData).length) {
      setAnswer(props.questionData);
    }
  }, [props.questionData]);

  const handleChange = (event) => {
    let updatedAnswer = answer[event.target.name];
    updatedAnswer.answer = event.target.value;
    setAnswer({ ...answer, [event.target.name]: updatedAnswer });
  };

  return (
    <div className='extra-question'>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.achievementData.length
              ? props.handleReturnClick("SCHOOL_ACHIEVEMENT_LIST")
              : props.handleReturnClick("SCHOOL_ACHIEVEMENT_PROMPT");
          }}></Button>
      </div>
      <img id='more-info-img' src={moreInfoImg} alt='More information' />
      <div className='prompt-instruction instruction'>
        <h2>Let's get to know you</h2>
        <FormGroup>
          {Object.keys(answer).map((key, i) => {
            return (
              <div key={i}>
                <label>{answer[key].question}</label>
                <TextField
                  variant='outlined'
                  multiline
                  rows={5}
                  placeholder='Type your answer here'
                  name={key}
                  value={answer[key].answer}
                  style={{ width: "100%", margin: "10px 0px 20px 0px" }}
                  onChange={handleChange}
                  required
                />
              </div>
            );
          })}
        </FormGroup>
        {/* <label>Tell us about what you do for fun</label>
      <FormGroup>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />

        <label>
          Tell us about a time when you led a team or another individual through
          a challenging situation
        </label>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />

        <label>
          Tell us about a time when things didn't go to plan. How did you cope?
        </label>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />

        <label>
          Tell us about a time when you had too much work to do. How did you
          handle it?
        </label>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />

        <label>
          Tell us about a time when someone disagreed with you. What did you do?
        </label>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />

        <label>
          Tell us about a time when you didn't receive the outcome you expected.
          What did you learn from that experience?
        </label>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          placeholder='Type your answer here'
          name='description'
          value={data}
          onChange={handleChange}
          required
        />
      </FormGroup> */}

        {props.isUpdate ? (
          <Button
            color='primary'
            variant='contained'
            style={{ width: "100%", margin: "20px 0px" }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => props.updateQuestions(answer)}>
            Update
          </Button>
        ) : (
          <div>
            <Button
              color='primary'
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => props.additionalQuestionContinueClick(answer)}>
              Continue
            </Button>
            <div className='skip' onClick={() => props.skip("LAST_QUESTION")}>
              <h6>Skip</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalQuestion;
