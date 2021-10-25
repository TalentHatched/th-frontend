import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const CourseCertificatePrompt = (props) => {
  const handleReturnClick = () => {
    if (props.haveWorkExperience) {
      props.handleReturnClick("WORK_EXP_LIST");
    } else {
      props.handleReturnClick("WORK_EXP_PROMPT");
    }
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => handleReturnClick()}></Button>
      </div>
      <h2>
        Do you have<br></br>
        courses or certificates you want to share?
      </h2>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.handleCourseCertificatePromptClick(true)}>
          Yes
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => props.handleCourseCertificatePromptClick(false)}>
          No
        </Button>
      </div>
    </div>
  );
};

export default CourseCertificatePrompt;
