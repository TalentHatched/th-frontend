import React, { useState, useEffect } from "react";

import { Button, FormGroup } from "@material-ui/core";
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
  }, [props.achievementData, props.schoolAchievementIdx]);

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
      setSchoolAchievement({ ...schoolAchievement, date: dateStr });
    }
  };

  const addSchoolAchievementClick = (type) => {
    if (validateForm()) {
      console.log("form now", schoolAchievement);
      if (type === "add") {
        props.addSchoolAchievement(schoolAchievement);
      } else if (type === "edit") {
        props.updateSchoolAchievement(
          schoolAchievement,
          props.schoolAchievementIdx,
          "edit"
        );
      } else if (type === "update") {
        if (props.addNew) {
          props.updateSchoolAchievement(schoolAchievement, "newItem", "update");
        } else {
          props.updateSchoolAchievement(
            schoolAchievement,
            props.schoolAchievementIdx,
            "update"
          );
        }
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
        {props.isUpdate ? (
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
              props.handleReturnClick("PROFILE");
            }}
          />
        ) : (
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
              props.achievementData.length
                ? props.handleReturnClick("SCHOOL_ACHIEVEMENT_LIST")
                : props.handleReturnClick("SCHOOL_ACHIEVEMENT_PROMPT");
            }}></Button>
        )}
      </div>
      <div className='achievement-form'>
        <h2 className='accomplish-header'>
          Add school achievements or accomplishments
        </h2>
        <FormGroup>
          <TextField
            id='title'
            variant='outlined'
            label='Title'
            name='title'
            value={title}
            style={{ margin: "10px 5px" }}
            onChange={handleChange}
            required
          />
          <TextField
            id='school-name'
            variant='outlined'
            label='School Name'
            name='schoolName'
            value={schoolName}
            style={{ margin: "10px 5px" }}
            onChange={handleChange}
            required
          />
          <TextField
            id='location'
            variant='outlined'
            label='Location'
            name='location'
            value={location}
            style={{ margin: "10px 5px" }}
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
                <TextField
                  {...params}
                  helperText={null}
                  style={{ margin: "10px 5px" }}
                />
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
            style={{ margin: "10px 5px" }}
            onChange={handleChange}
            required
          />
        </FormGroup>
        {warning ? "" : ""}

        {props.isUpdate ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: "100%", margin: "20px 0px" }}
            onClick={() => addSchoolAchievementClick("update")}>
            {props.addNew
              ? "Add school accomplishment"
              : "Update school accomplishment"}
          </Button>
        ) : props.schoolAchievementIdx === "" ? (
          <div>
            <Button
              variant='contained'
              color='primary'
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => addSchoolAchievementClick("add")}>
              Add school achievement
            </Button>
            <div
              className='skip'
              onClick={() => props.skip("ADDITIONAL_QUESTION")}>
              <h6>Skip</h6>
            </div>
           
          </div>
        ) : (
          <div>
            <Button
              variant='contained'
              color='primary'
              style={{ width: "100%", margin: "20px 0px" }}
              onClick={() => addSchoolAchievementClick("edit")}>
              Update school achievement
            </Button>
            <div
              className='skip'
              onClick={() => props.skip("ADDITIONAL_QUESTION")}>
              <h6>Skip</h6>
            </div>
           å
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolAchievementForm;
