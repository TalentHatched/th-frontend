import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

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

  useEffect(() => {
    if (Object.values(props.generalTechData).length) {
      setGeneralTech(props.generalTechData);
    }
  }, [props.generalTechData]);

  const { Figma, AdobeXD, Photoshop, GoogleSuite, MicrosoftOffice, Slack } =
    generalTech;

  const handleChange = (event) => {
    setGeneralTech({
      ...generalTech,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGeneralTechClick = (type) => {
    props.handleGeneralTechClick(generalTech, type);
  };

  return (
    <div className='tech-lg-selection'>
      <div>
        {props.isUpdate ? (
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
              props.handleReturnClick("PROFILE");
            }}></Button>
        ) : (
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
              if (props.techTrack) {
                props.handleReturnClick("PROGRAMMING_LANGUAGES");
              } else {
                props.handleReturnClick("INDUSTRY");
              }
            }}></Button>
        )}
      </div>
      <div className='tech-lg-instruction instruction'>
        <h2>Do you have experience with any of the following?</h2>
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
      <div>
        {props.isUpdate ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() => handleGeneralTechClick("update")}>
            Choose Skills
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() => handleGeneralTechClick("onboard")}>
            Choose Skills
          </Button>
        )}
      </div>
      <div className='save-later'>
        <h6 onClick={() => props.saveNow()}>Save and complete later?</h6>
      </div>
    </div>
  );
};

export default GeneralTechSkill;
