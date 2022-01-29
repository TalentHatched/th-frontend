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
import "./searchFilter.css";

const SearchFilter = (props) => {
  const [criteria, setCriteria] = useState({
    ninth: false,
    tenth: false,
    eleventh: false,
    twelveth: false,
    technology: false,
    business: false,
    medical: false,
    retail: false,
    other: false,
    completeProfile: false,
    incompleteProfile: false,
  });

  useEffect(() => {
    if (props.filterValue) {
      setCriteria(props.filterValue);
    }
  }, [props.filterValue]);

  const {
    ninth,
    tenth,
    eleventh,
    twelveth,
    technology,
    business,
    medical,
    retail,
    other,
    completeProfile,
    incompleteProfile,
  } = criteria;

  const handleChange = (event) => {
    props.onSearchFilterSelection(event);
  };

  return (
    <div className='search-filter'>
      <Accordion className='extra-question'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>Grade</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox checked={ninth} onChange={handleChange} name='ninth' />
            }
            label='9'
            labelPlacement='start'
          />
          <FormControlLabel
            control={
              <Checkbox checked={tenth} onChange={handleChange} name='tenth' />
            }
            label='10'
            labelPlacement='start'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={eleventh}
                onChange={handleChange}
                name='eleventh'
              />
            }
            label='11'
            labelPlacement='start'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={twelveth}
                onChange={handleChange}
                name='twelveth'
              />
            }
            label='12'
            labelPlacement='start'
          />
        </AccordionDetails>
      </Accordion>
      <Accordion className='extra-question'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>Specialization</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={technology}
                onChange={handleChange}
                name='technology'
              />
            }
            label='Technology'
            labelPlacement='start'
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
            labelPlacement='start'
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
            labelPlacement='start'
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
            labelPlacement='start'
          />
          <FormControlLabel
            control={
              <Checkbox checked={other} onChange={handleChange} name='other' />
            }
            label='Other'
            labelPlacement='start'
          />
        </AccordionDetails>
      </Accordion>
      <div className='profile-complete-labels'>
        <FormControlLabel
          control={
            <Checkbox
              checked={completeProfile}
              onChange={handleChange}
              name='completeProfile'
            />
          }
          label='Profile complete'
          labelPlacement='start'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={incompleteProfile}
              onChange={handleChange}
              name='incompleteProfile'
            />
          }
          label='Profile incomplete'
          labelPlacement='start'
        />
      </div>
      <Button
        className='update-button'
        color='primary'
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.onSearchUpdateClick()}
        style={{ fontSize: "16px", width: "80%", margin: "10px" }}>
        <h5>Update</h5>
      </Button>
    </div>
  );
};

export default SearchFilter;
