import React, { useState, useEffect } from "react";

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
  const [warning, setWarning] = useState([]);

  useEffect(() => {
    if (props.otherSkillData.length) {
      setSkillList(props.otherSkillData);
    }
  },[]);
  const onInputFieldChange = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleAddSkillClick = () => {
    setSkillList([...skillList, currentSkill]);
    setCurrentSkill("");
    console.log("skillLsit", skillList);
  };

  const removeSkill = (index) => {
    setSkillList(skillList.filter((skill, idx) => idx !== index));
  };

  const onSubmitSkill = () => {
    if (validate()) {
      props.handleOtherSkillClick(skillList);
    }
  };

  const validate = () => {
    let skillSet = new Set();

    skillList.forEach((skill) => {
      let lowerCaseSkill = skill.toLowerCase();
      skillSet.add(lowerCaseSkill);
    });

    if (skillSet.size !== skillList.length) {
      setWarning("Duplicate skills detected - please provide unique skills");
      return false;
    } else {
      return true;
    }
  };

  const listSkills = skillList.map((skill, idx) => {
    return (
      <ListItem key={idx}>
        <ListItemText primary={skill} />
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => removeSkill(idx)}>
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
          {warning ? <h4>{warning}</h4> : ""}
          <Button
            color='primary'
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            onClick={() => onSubmitSkill()}>
            Continue
          </Button>
          <h2>Add another skill</h2>
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