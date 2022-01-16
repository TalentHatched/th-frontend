import React, { useState, useEffect } from "react";

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
  }, [props.skillData]);

  const { firstSkill, secondSkill, thirdSkill, forthSkill, fifthSkill } =
    softSkill;

  const handleChange = (event) => {
    setSoftSkill({ ...softSkill, [event.target.name]: event.target.value });
  };

  const handleSubmit = (type) => {
    if (validate()) {
      props.handleSoftSkillClick(softSkill, type);
      return true;
    } else {
      setWarning("Please select a unique skill for each dropdown");
      return false;
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

  const saveNow = () => {
    if (handleSubmit()) {
      props.saveNow();
    }
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.handleReturnClick("GENERAL_TECH_SKILL");
          }}></Button>
      </div>
      <div className='soft-skill-instruction instruction'>
        <h2>What are your top 5 soft skills?</h2>
      </div>
      <Box sx={{ minWidth: 120, margin: "20px 0px" }}>
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

      <Box sx={{ minWidth: 120, margin: "20px 0px" }}>
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

      <Box sx={{ minWidth: 120, margin: "20px 0px" }}>
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

      <Box sx={{ minWidth: 120, margin: "20px 0px" }}>
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

      <Box sx={{ minWidth: 120, margin: "20px 0px" }}>
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
      {warning ? <h4 className='warning-message'>{warning}</h4> : ""}

      <div>
        {props.isUpdate ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() => handleSubmit("update")}>
            Update Your Skills
          </Button>
        ) : (
          <div>
            <Button
              variant='contained'
              color='primary'
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => handleSubmit("onboard")}>
              Choose Your Skills
            </Button>

            <div className='save-later'>
              <h6 onClick={() => saveNow()}>Save and complete later?</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftSkillScreen;
