import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ProgrammingLanguage = (props) => {
  const [programmingLanguageState, setProgrammingLanguageState] = useState({
    HTML: false,
    CSS: false,
    JavaScript: false,
    Python: false,
  });
  const [noneOfThese, setNoneOfThese] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (Object.values(props.programmingLanguageData).length) {
      setProgrammingLanguageState(props.programmingLanguageData);
    }
  }, [props.programmingLanguageData]);

  const { HTML, CSS, JavaScript, Python } = programmingLanguageState;

  const handleChange = (event) => {
    if (event.target.name === "none" && event.target.checked) {
      setProgrammingLanguageState({
        HTML: false,
        CSS: false,
        JavaScript: false,
        Python: false,
      });
      setNoneOfThese(true);
    } else {
      setNoneOfThese(false);
      setProgrammingLanguageState({
        ...programmingLanguageState,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleChooseProgrammingLanguageClick = (type) => {
    setWarning("");
    if (!HTML & !CSS & !JavaScript && !Python && !noneOfThese) {
      setWarning("Please select at least one option");
    } else {
      props.handleProgrammingLanguageClick(programmingLanguageState, type);
    }
  };

  const saveNow = async () => {
    console.log(programmingLanguageState);
    await props.handleProgrammingLanguageClick(
      programmingLanguageState,
      "onboard"
    );

    props.saveNow();
  };

  return (
    <div className='programming-lg-selection'>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.handleReturnClick("INDUSTRY");
          }}></Button>
      </div>
      <div className='programming-instruction instruction'>
        <h2>Do you have experience with any of these programming languages?</h2>
        <h2 className='check-all'>Check all that apply. </h2>
      </div>

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
              <Checkbox
                checked={noneOfThese}
                onChange={handleChange}
                name='none'
              />
            }
            label='None of these'
          />
        </FormGroup>

        {/* <FormHelperText>You can display an error</FormHelperText> */}
      </FormControl>
      {warning ? <h4 className='warning-message'>{warning}</h4> : ""}
      <div>
        {props.isUpdate ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() => handleChooseProgrammingLanguageClick("update")}>
            Update Skills
          </Button>
        ) : (
          <div>
            <Button
              variant='contained'
              color='primary'
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => handleChooseProgrammingLanguageClick("onboard")}>
              Choose Skills
            </Button>
            <div className='save-later'>
              <h6 onClick={() => saveNow()}>Save and complete later?</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammingLanguage;
