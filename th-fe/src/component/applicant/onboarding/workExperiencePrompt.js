import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import workExpImg from "../../../img/work-exp-prompt.png";

const workExperiencePrompt = (props) => {
  return (
    <div className='work-exp-prompt-instruction '>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("OTHER_SKILL")}></Button>
      </div>
      <img id='work-exp-img' alt="work-experience" src={workExpImg}></img>

      <div className='prompt-instruction '>
        <h2>
          Do you have<br></br>
          work experience?
        </h2>
        <div>
          <Button
            variant='contained'
            color='primary'
            style={{ width: "35%", margin: "30px 10px " }}
            onClick={() => props.handleWorkExperiencePromptClick(true)}>
            Yes
          </Button>
          <Button
            variant='outlined'
            color='primary'
            style={{ width: "35%", margin: "30px 10px" }}
            onClick={() => props.handleWorkExperiencePromptClick(false)}>
            No
          </Button>
        </div>

        <div>
          <h3 className="work-prompt-detail">
            This includes paid or unpaid work you ahve done with a business or
            organization in any industry. Do not include school achievements. We
            will ask about this in another section.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default workExperiencePrompt;
