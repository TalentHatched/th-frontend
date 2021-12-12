import React, { useState } from "react";
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

  const defaultCriteria = {
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
  };

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
    setCriteria({ ...criteria, [event.target.name]: event.target.checked });
  };

  const onResetClick = () => {
    setCriteria(defaultCriteria);
    props.onResetClick();
  };

  return (
    <div>
      <Accordion className='extra-question'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>Grade</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox checked={ninth} onChange={handleChange} name='ninth' />
            }
            label='9'
          />
          <FormControlLabel
            control={
              <Checkbox checked={tenth} onChange={handleChange} name='tenth' />
            }
            label='10'
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
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={technology}
                onChange={handleChange}
                name='technology'
              />
            }
            label='Technology'
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
        </AccordionDetails>
      </Accordion>
      <FormControlLabel
        control={
          <Checkbox
            checked={completeProfile}
            onChange={handleChange}
            name='completeProfile'
          />
        }
        label='Profile complete'
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
      />
      <Button
        color='primary'
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        onClick={() => props.onSearchUpdateClick(criteria)}>
        Update
      </Button>
      <Button color='primary' variant='outlined' onClick={() => onResetClick()}>
        Reset
      </Button>
    </div>
  );
};

export default SearchFilter;
