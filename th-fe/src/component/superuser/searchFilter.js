import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const SearchFilter = (props) => {
  const [criteria, setCriteria] = useState({
    applicant: false,
    admin: false,
  });

  useEffect(() => {
    if (props.filterValue) {
      setCriteria(props.filterValue);
    }
    console.log("What is props", props);
  }, [props.filterValue]);

  const { applicant, admin } = criteria;

  const handleChange = (event) => {
    console.log("handle change fired", event.target.checked);
    setCriteria({ ...criteria, [event.target.name]: event.target.checked });
  };

  return (
    <div className='search-filter'>
      <div className='profile-complete-labels'>
        <FormControlLabel
          control={
            <Checkbox
              checked={applicant}
              onChange={handleChange}
              name='applicant'
            />
          }
          label='Applicant Only'
          labelPlacement='start'
        />
        <FormControlLabel
          control={
            <Checkbox checked={admin} onChange={handleChange} name='admin' />
          }
          label='Administrator only'
          labelPlacement='start'
        />
      </div>
      <Button
        className='update-button'
        color='primary'
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.onSearchUpdateClick(criteria)}
        style={{ fontSize: "16px", width: "80%", margin: "10px" }}>
        <h5>Update</h5>
      </Button>
    </div>
  );
};

export default SearchFilter;
