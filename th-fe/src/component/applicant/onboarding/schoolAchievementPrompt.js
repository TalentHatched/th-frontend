import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const SchooAchievementPrompt = (props) => {
  const handleReturnClick = () => {
    if (props.haveCertificate) {
      props.handleReturnClick("COURSE_CERTIFICATE_LIST");
    } else {
      props.handleReturnClick("COURSE_CERTIFICATE_PROMPT");
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
        Do you have any<br></br>
        school achievements you want to share?
      </h2>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.handleSchoolAchievementClick(true)}>
          Yes
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => props.handleSchoolAchievementClick(false)}>
          No
        </Button>
      </div>
    </div>
  );
};

export default SchooAchievementPrompt;
