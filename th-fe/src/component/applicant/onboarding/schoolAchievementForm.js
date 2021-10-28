import React, { useState, useEffect } from "react";

import { Button, FormGroup, FormControlLabel } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const SchoolAchievementForm = (props) => {
  const [achievementDate, setAchievementDate] = useState("");
  const [schoolAchievement, setSchoolAchievement] = useState({
    title: "",
    schoolName: "",
    location: "",
    date: "",
    description: "",
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (props.schoolAchievementIdx !== "") {
      console.log("What is data", props.achievementData);
      console.log(props.schoolAchievementIdx);
      setSchoolAchievement(props.achievementData[props.schoolAchievementIdx]);
      setAchievementDate(
        props.achievementData[props.schoolAchievementIdx].date
      );
    }
  }, []);

  const { title, schoolName, location, date, description } = schoolAchievement;

  const handleChange = (event) => {
    setSchoolAchievement({
      ...schoolAchievement,
      [event.target.name]: event.target.value,
    });
  };

  const handleAchievementDateChange = (value) => {
    setAchievementDate(value);
    if (value) {
      let dateStr = value.toString();
      setSchoolAchievement({ ...schoolAchievement, ["date"]: dateStr });
    }
  };

  const addSchoolAchievementClick = (type) => {
    if (validateForm()) {
      console.log("form now", schoolAchievement);
      if (type === "add") {
        props.addSchoolAchievement(schoolAchievement);
      } else if (type === "edit") {
        props.updateSchoolAchievement(schoolAchievement, props.schoolAchievementIdx);
      }

      //sprops.addSchoolAchievement(schoolAchievement);
    }
  };

  const validateForm = () => {
    setWarning("");

    let invalidItems = [];

    if (!title) {
      invalidItems.push("Title");
    }

    if (!schoolName) {
      invalidItems.push("School Name");
    }

    if (!location) {
      invalidItems.push("Location");
    }

    if (!date) {
      invalidItems.push(Date);
    }
    if (invalidItems.length) {
      let warningMessage = invalidItems.join(", ");
      setWarning(warningMessage);
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
            props.handleReturnClick("SCHOOL_ACHIEVEMENT_PROMPT")
          }></Button>
      </div>
      <h1>Add school achievements</h1>
      <FormGroup>
        <TextField
          id='title'
          variant='outlined'
          label='Title'
          name='title'
          value={title}
          onChange={handleChange}
          required
        />
        <TextField
          id='school-name'
          variant='outlined'
          label='School Name'
          name='schoolName'
          value={schoolName}
          onChange={handleChange}
          required
        />
        <TextField
          id='location'
          variant='outlined'
          label='Location'
          name='location'
          value={location}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label='Date'
            minDate={new Date("1970-01-01")}
            maxDate={new Date()}
            name='date'
            value={achievementDate}
            onChange={(newValue) => handleAchievementDateChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          label='Description'
          name='description'
          value={description}
          onChange={handleChange}
          required
        />
      </FormGroup>
     

      {props.schoolAchievementIdx === "" ? (
        <Button
        variant='contained'
        color='primary'
        onClick={() => addSchoolAchievementClick("add")}>
        Add school achievement
      </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addSchoolAchievementClick("edit")}>
          Update school achievement
        </Button>
      )}
    </div>
  );
};

export default SchoolAchievementForm;
