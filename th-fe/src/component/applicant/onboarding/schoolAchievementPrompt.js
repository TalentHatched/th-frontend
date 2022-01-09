import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import accomplishImg from "../../../img/accomplish-img.png";

const SchooAchievementPrompt = (props) => {
  const handleReturnClick = () => {
    if (props.haveCertificate) {
      props.handleReturnClick("COURSE_CERTIFICATE_LIST");
    } else {
      props.handleReturnClick("COURSE_CERTIFICATE_PROMPT");
    }
  };

  return (
    <div className='accomplish-prompt-instruction'>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => handleReturnClick()}></Button>
      </div>
      <img
        id='accomplish-img'
        alt='school accomplishment'
        src={accomplishImg}
      />
      <div className='prompt-instruction'>
        <h2 className="accomplish-header">
          Do you have any school achievements/accomplishments you want to share?
        </h2>
        <div>
          <Button
            variant='contained'
            color='primary'
            style={{ width: "35%", margin: "30px 10px" }}
            onClick={() => props.handleSchoolAchievementPromptClick(true)}>
            Yes
          </Button>
          <Button
            variant='outlined'
            color='primary'
            style={{ width: "35%", margin: "30px 10px" }}
            onClick={() => props.handleSchoolAchievementPromptClick(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchooAchievementPrompt;
