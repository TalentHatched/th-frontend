import React, { useState, useEffect } from "react";

import {
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
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
  }, [props.otherSkillData]);
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

  const onSubmitSkill = (type) => {
    if (validate()) {
      props.handleOtherSkillClick(skillList, type);
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
    <div className='other-skill-selection'>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() =>
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.handleReturnClick("SOFT_SKILL")
          }></Button>
      </div>
      {skillList.length ? (
        <div class='other-skill-instruction instruction'>
          <h2>Your Skills</h2>
          <List>{listSkills}</List>
          {warning ? <h4 className='warning-message'>{warning}</h4> : ""}
          {props.isUpdate ? (
            <Button
              color='primary'
              variant='contained'
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => onSubmitSkill("update")}>
              Update Other Skill
            </Button>
          ) : (
            <Button
              color='primary'
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => onSubmitSkill("onboard")}>
              Continue
            </Button>
          )}

          <h2 className='add-other-skill'>Add another skill</h2>
        </div>
      ) : (
        <div className='other-skill-instruction instruction'>
          <h2>What other skills do you have?</h2>
          <h2 className='check-all'>
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
            placeholder="Type skill"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={onInputFieldChange}
            value={currentSkill}></TextField>
        </div>
        <Button
          color='primary'
          variant='contained'
          disabled={currentSkill.length ? false : true}
          style={{ width: "100%", margin: "20px 0px" }}
          onClick={() => handleAddSkillClick()}>
          Add Skill
        </Button>
      </div>
      <div className='skip' onClick={() => props.skip("WORK_EXP_PROMPT")}>
        <h6>Skip</h6>
      </div>
      <div className='save-later'>
        <h6 onClick={() => props.saveNow()}>Save and complete later?</h6>
      </div>
    </div>
  );
};

export default OtherSkillScreen;
