import React, { useState } from "react";

import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";

const OtherSkillScreen = (props) => {
  const [currentSkill, setCurrentSkill] = useState("");
  const [skillList, setSkillList] = useState([]);

  var skills = [];
  const onInputFieldChange = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleAddSkillClick = () => {
    setSkillList([...skillList, currentSkill]);
    setCurrentSkill("");
    console.log("skillLsit", skillList);
  };

  const removeSkill = (item) => {
    setSkillList(skillList.filter((skill) => skill !== item));
  };

  const listSkills = skillList.map((skill, idx) => {
    return (
      <ListItem key={idx}>
        <ListItemText primary={skill} />
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => removeSkill(skill)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("SOFT_SKILL")}></Button>
      </div>
      {skillList.length ? (
        <div>
          <h2>Your Skills</h2>
          <List>{listSkills}</List>
          <Button
            color='primary'
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            onClick={() => props.handleOtherSkillClick()}>
            Continue
          </Button>
        </div>
      ) : (
        <div>
          <h2>What other skills do you have?</h2>
          <h2>
            <strong>Add a skill</strong>
          </h2>
        </div>
      )}

      <div className='other-skill-input-form'>
        <div>
          <TextField
            type='text'
            className='other-skill-input'
            variant='outlined'
            onChange={onInputFieldChange}
            value={currentSkill}></TextField>
        </div>
        <Button
          color='primary'
          variant='contained'
          disabled={currentSkill.length ? false : true}
          onClick={() => handleAddSkillClick()}>
          Add Skill
        </Button>
      </div>
    </div>
  );
};

export default OtherSkillScreen;
