import React, { useState } from "react";

import {
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const SoftSkillScreen = (props) => {
  const [firstSkill, setFirstSkill] = useState("");
  const [secondSkill, setSecondSkill] = useState("");
  const [thirdSkill, setThirdSkill] = useState("");

  const handleFirstSkillChange = (event) => {
    setFirstSkill(event.target.value);
  };

  const handleSecondSkillChange = (event) => {
    setSecondSkill(event.target.value);
  };

  const handleThirdSkillChange = (event) => {
    setThirdSkill(event.target.value);
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("INDUSTRY")}></Button>
      </div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose First Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={firstSkill}
            label='Choose Skill'
            onChange={handleFirstSkillChange}>
            <MenuItem value='Adaptability'>Adaptability</MenuItem>
            <MenuItem value='Communication'>Communication</MenuItem>
            <MenuItem value='Creativity'>Creativity</MenuItem>
            <MenuItem value='Problem Solving'>Problem Solving</MenuItem>
            <MenuItem value='Team Work'>Team Work</MenuItem>
            <MenuItem value='Time Management'>Time Management</MenuItem>
            <MenuItem value='Willing To Learn'>Willing to Learn</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose Second Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={secondSkill}
            label='Choose Skill'
            onChange={handleSecondSkillChange}>
            <MenuItem value='Adaptability'>Adaptability</MenuItem>
            <MenuItem value='Communication'>Communication</MenuItem>
            <MenuItem value='Creativity'>Creativity</MenuItem>
            <MenuItem value='Problem Solving'>Problem Solving</MenuItem>
            <MenuItem value='Team Work'>Team Work</MenuItem>
            <MenuItem value='Time Management'>Time Management</MenuItem>
            <MenuItem value='Willing To Learn'>Willing to Learn</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose Third Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={thirdSkill}
            label='Choose Skill'
            onChange={handleThirdSkillChange}>
            <MenuItem value='Adaptability'>Adaptability</MenuItem>
            <MenuItem value='Communication'>Communication</MenuItem>
            <MenuItem value='Creativity'>Creativity</MenuItem>
            <MenuItem value='Problem Solving'>Problem Solving</MenuItem>
            <MenuItem value='Team Work'>Team Work</MenuItem>
            <MenuItem value='Time Management'>Time Management</MenuItem>
            <MenuItem value='Willing To Learn'>Willing to Learn</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.handleSoftSkillClick()}>
          Choose Your Skills
        </Button>
      </div>
    </div>
  );
};

export default SoftSkillScreen;
