import React from "react";

import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const workExperiencePrompt = (props) => {
  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("OTHER_SKILL")}></Button>
      </div>
      <h2>
        Do you have<br></br>
        work experience?
      </h2>
      <div>
        <Button variant='contained' color='primary' onClick={()=>props.handleWorkExperiencePromptClick(true)}>
          Yes
        </Button>
        <Button variant='outlined' color='primary' onClick={()=>props.handleWorkExperiencePromptClick(false)}>
          No
        </Button>
      </div>
      <div>
        <h3>
          This includes paid or unpaid work you ahve done with a business or
          organization in any industry. Do not include school achievements. We
          will ask about this in another section.
        </h3>
      </div>
    </div>
  );
};

export default workExperiencePrompt;
