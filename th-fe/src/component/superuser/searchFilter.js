import React, { useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
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
  }, [props.filterValue]);

  const { applicant, admin } = criteria;

  const handleChange = (event) => {
    setCriteria({ ...criteria, [event.target.name]: event.target.checked });
  };

  return (
    <div className='su-search-filter'>
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
        color='primary'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.onSearchUpdateClick(criteria)}>
        <h5>Update</h5>
      </Button>
    </div>
  );
};

export default SearchFilter;
