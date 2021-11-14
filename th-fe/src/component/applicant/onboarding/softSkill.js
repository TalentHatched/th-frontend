import React, { useState, useEffect } from "react";

import {
  Button,
  Box,
  InputLabel,
  Menu,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const SoftSkillScreen = (props) => {
  const [softSkill, setSoftSkill] = useState({
    firstSkill: "",
    secondSkill: "",
    thirdSkill: "",
    forthSkill: "",
    fifthSkill: "",
  });

  const [warning, setWarning] = useState("");

  const skills = [
    "Adaptability",
    "Communication",
    "Creativity",
    "Problem Solving",
    "Team Work",
    "Time Management",
    "Willing To Learn",
  ];

  useEffect(() => {
    if (Object.values(props.skillData).length) {
      setSoftSkill(props.skillData);
    }
  }, []);

  const { firstSkill, secondSkill, thirdSkill, forthSkill, fifthSkill } =
    softSkill;

  const handleChange = (event) => {
    console.log("event.target", event.target);
    setSoftSkill({ ...softSkill, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      props.handleSoftSkillClick(softSkill);
    } else {
      setWarning("Please select a unique skill for each dropdown");
    }
  };

  const validate = () => {
    let skillSet = new Set();

    Object.values(softSkill).forEach((skill) => {
      skillSet.add(skill);
    });
    if (skillSet.size < 5) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() =>
            props.handleReturnClick("GENERAL_TECH_SKILL")
          }></Button>
      </div>
      <h2>What are your top 5 soft skills?</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose First Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='firstSkill'
            value={firstSkill}
            label='Choose Skill'
            onChange={handleChange}>
            {skills.map((skill, index) => {
              return (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              );
            })}
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
            name='secondSkill'
            value={secondSkill}
            label='Choose Skill'
            onChange={handleChange}>
            {skills.map((skill, index) => {
              return (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              );
            })}
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
            name='thirdSkill'
            value={thirdSkill}
            label='Choose Skill'
            onChange={handleChange}>
            {skills.map((skill, index) => {
              return (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose Forth Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='forthSkill'
            value={forthSkill}
            label='Choose Skill'
            onChange={handleChange}>
            {skills.map((skill, index) => {
              return (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Choose Fifth Skill
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='fifthSkill'
            value={fifthSkill}
            label='Choose Skill'
            onChange={handleChange}>
            {skills.map((skill, index) => {
              return (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {warning ? <h4>{warning}</h4> : ""}

      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleSubmit()}>
          Choose Your Skills
        </Button>
      </div>
    </div>
  );
};

export default SoftSkillScreen;
