import React, { useState, useEffect } from "react";

import { Button, FormGroup, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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
  }, []);

  const handleChange = (event) => {
    let updatedAnswer = answer[event.target.name];
    updatedAnswer.answer = event.target.value;
    setAnswer({ ...answer, [event.target.name]: updatedAnswer });
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.achievementData.length
              ? props.handleReturnClick("SCHOOL_ACHIEVEMENT_LIST")
              : props.handleReturnClick("SCHOOL_ACHIEVEMENT_PROMPT");
          }}></Button>
      </div>
      <h1>Let's get to know you</h1>
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
      <Button
        color='primary'
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.additionalQuestionContinueClick(answer)}>
        Continue
      </Button>
    </div>
  );
};

export default AdditionalQuestion;
