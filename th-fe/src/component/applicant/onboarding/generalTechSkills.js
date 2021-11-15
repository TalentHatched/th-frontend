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

const GeneralTechSkill = (props) => {
  const [generalTech, setGeneralTech] = useState({
    Figma: false,
    AdobeXD: false,
    Photoshop: false,
    GoogleSuite: false,
    MicrosoftOffice: false,
    Slack: false,
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (Object.values(props.generalTechData).length) {
      setGeneralTech(props.generalTechData);
    }
  },[]);

  const { Figma, AdobeXD, Photoshop, GoogleSuite, MicrosoftOffice, Slack } =
    generalTech;

  const handleChange = (event) => {
    setGeneralTech({
      ...generalTech,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGeneralTechClick = () => {
    props.handleGeneralTechClick(generalTech);
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            if (props.techTrack) {
              props.handleReturnClick("PROGRAMMING_LANGUAGES");
            } else {
              props.handleReturnClick("INDUSTRY");
            }
          }}></Button>
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
              <Checkbox checked={Figma} onChange={handleChange} name='Figma' />
            }
            label='Figma'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={AdobeXD}
                onChange={handleChange}
                name='AdobeXD'
              />
            }
            label='Adobe XD'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Photoshop}
                onChange={handleChange}
                name='Photoshop'
              />
            }
            label='Adobe Photoshop'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={GoogleSuite}
                onChange={handleChange}
                name='GoogleSuite'
              />
            }
            label='Google Suite'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={MicrosoftOffice}
                onChange={handleChange}
                name='MicrosoftOffice'
              />
            }
            label='Microsoft Office'
          />

          <FormControlLabel
            control={
              <Checkbox checked={Slack} onChange={handleChange} name='Slack' />
            }
            label='Slack'
          />
        </FormGroup>

        {/* <FormHelperText>You can display an error</FormHelperText> */}
      </FormControl>
      {warning ? <h4>{warning}</h4> : ""}
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleGeneralTechClick()}>
          Choose Skills
        </Button>
      </div>
    </div>
  );
};

export default GeneralTechSkill;
