import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

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
    if (Object.values(props.industryData).length) {
      setIndustryState(props.industryData);
    }
  }, [props.industryData]);

  const { technology, business, medical, retail, other } = industryState;

  const handleChange = (event) => {
    setIndustryState({
      ...industryState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChooseIndustryClick = () => {
    setWarning("");
    if (!technology && !business && !medical && !retail && !other) {
      setWarning("Please select at least one industry");
    } else {
      props.handleIndustryClick(industryState);
    }
  };

  const saveNow = async () => {
    await props.handleIndustryClick(industryState);

    if (warning === "") {
      props.saveNow();
    }
  };

  return (
    <div className='industry-selection'>
      {/* <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("PARENT_CONTACT")}></Button>
      </div> */}
      <div className='industry-instruction instruction'>
        <h2>Which industry/industries are you interested in?</h2>
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
      {warning ? <h4 className='warning-message'>{warning}</h4> : ""}
      <div>
        <Button
          variant='contained'
          color='primary'
          style={{ width: "100%", margin: "20px 0px" }}
          onClick={() => handleChooseIndustryClick()}>
          Choose Industry
        </Button>
      </div>
      <div className='save-later'>
        <h6 onClick={() => saveNow()}>Save and complete later?</h6>
      </div>
    </div>
  );
};

export default IndustryScreen;
