import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import courseCertImg from "../../../img/course-cert-img.png";

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
      <img
        id='course-cert-img'
        alt='course certificate image'
        src={courseCertImg}
      />
      <div className='prompt-instruction'>
        <h2>
          Do you have<br></br>
          courses or certificates you want to share?
        </h2>
        <div>
          <Button
            variant='contained'
            color='primary'
            style={{ width: "35%", margin: "30px 10px" }}
            onClick={() => props.handleCourseCertificatePromptClick(true)}>
            Yes
          </Button>
          <Button
            variant='outlined'
            color='primary'
            style={{ width: "35%", margin: "30px 10px" }}
            onClick={() => props.handleCourseCertificatePromptClick(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCertificatePrompt;
