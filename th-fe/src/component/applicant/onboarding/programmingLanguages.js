import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ProgrammingLanguage = (props) => {
  const [programmingLanguageState, setProgrammingLanguageState] = useState({
    HTML: false,
    CSS: false,
    JavaScript: false,
    Python: false,
    noneOfThese: false,
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (Object.values(props.programmingLanguageData).length) {
      setProgrammingLanguageState(props.programmingLanguageData);
    }
  },[]);

  const { HTML, CSS, JavaScript, Python, noneOfThese } = programmingLanguageState;

  const handleChange = (event) => {
    if (event.target.name === "none" && event.target.checked) {
      setProgrammingLanguageState({
        HTML: false,
        CSS: false,
        JavaScript: false,
        Python: false,
        none: true,
      });
    } else {
      setProgrammingLanguageState({
        ...programmingLanguageState,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleChooseProgrammingLanguageClick = () => {
    setWarning("");
    if (!HTML & !CSS & !JavaScript && !Python && !noneOfThese) {
      setWarning("Please select at least one option");
    } else {
      props.handleProgrammingLanguageClick(programmingLanguageState);
    }
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("INDUSTRY")}></Button>
      </div>
      <h2>Do you have experience with any of these programming languages?</h2>
      <h3>Check all that apply. </h3>

      <FormControl
        required
        error={props.error}
        component='fieldset'
        variant='standard'>
        {/* <FormLabel component="legend">Pick two</FormLabel> */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={HTML} onChange={handleChange} name='HTML' />
            }
            label='HTML'
          />
          <FormControlLabel
            control={
              <Checkbox checked={CSS} onChange={handleChange} name='CSS' />
            }
            label='CSS'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={JavaScript}
                onChange={handleChange}
                name='JavaScript'
              />
            }
            label='JavaScript'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={Python}
                onChange={handleChange}
                name='Python'
              />
            }
            label='Python'
          />

          <FormControlLabel
            control={
              <Checkbox checked={noneOfThese} onChange={handleChange} name='none' />
            }
            label='None of these'
          />
        </FormGroup>

        {/* <FormHelperText>You can display an error</FormHelperText> */}
      </FormControl>
      {warning ? <h4>{warning}</h4> : ""}
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleChooseProgrammingLanguageClick()}>
          Choose Skills
        </Button>
      </div>
    </div>
  );
};

export default ProgrammingLanguage;
