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

const IndustryScreen = (props) => {
  const [industryState, setIndustryState] = useState({
    technology: false,
    business: false,
    medical: false,
    retail: false,
    other: false,
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    // if (props.industryData.length) {
    console.log("industryData", props.industryData);
   
    if (Object.values(props.industryData).length) {
      setIndustryState(props.industryData);
    }
  }, []);

  const { technology, business, medical, retail, other } = industryState;

  const handleChange = (event) => {
    setIndustryState({
      ...industryState,
      [event.target.name]: event.target.checked,
    });
    console.log("What is industryState", industryState);
  };

  const handleChooseIndustryClick = () => {
    setWarning("");
    if (!technology && !business && !medical && !retail && !other) {
      setWarning("Please select at least one industry");
    } else {
      // let applicantIndustry = [];
      // for (const industry in industryState) {
      //   if (industryState[industry]) {
      //     applicantIndustry.push(industry);
      //   }
      // }
      // console.log("what is industry state on click", industryState);
      props.handleIndustryClick(industryState);
    }
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
              <Checkbox checked={other} onChange={handleChange} name='other' />
            }
            label='Other'
          />
        </FormGroup>

        {/* <FormHelperText>You can display an error</FormHelperText> */}
      </FormControl>
      {warning ? <h4>{warning}</h4> : ""}
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleChooseIndustryClick()}>
          Choose Industry
        </Button>
      </div>
    </div>
  );
};

export default IndustryScreen;
