import React, { useState } from "react";

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

const IndustryScreen = (props) => {
  const [industryState, setIndustryState] = useState({
    technology: false,
    business: false,
    medical: false,
    retail: false,
    other: false,
  });

  const { technology, business, medical, retail, other } = industryState;

  const handleChange = (event) => {
    setIndustryState({
      ...industryState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("PARENT_CONTACT")}></Button>
      </div>
      <h2>Which industry/industries are you interested in?</h2>
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
              <Checkbox
                checked={technology}
                onChange={handleChange}
                name='technology'
                defaultChecked
              />
            }
            label='Technology (CS, Development, Design)'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={business}
                onChange={handleChange}
                name='business'
              />
            }
            label='Business'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={medical}
                onChange={handleChange}
                name='medical'
              />
            }
            label='Medical'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={retail}
                onChange={handleChange}
                name='retail'
              />
            }
            label='Retail/Hospitality'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={other}
                onChange={handleChange}
                name='other'
              />
            }
            label='Other'
          />
        </FormGroup>

        {/* <FormHelperText>You can display an error</FormHelperText> */}
      </FormControl>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.handleIndustryClick()}>
          Choose Industry
        </Button>
      </div>
    </div>
  );
};

export default IndustryScreen;
