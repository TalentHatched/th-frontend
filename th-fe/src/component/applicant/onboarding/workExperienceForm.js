import React, { useState, useEffect } from "react";

import {
  Button,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const employmentTypeOptions = [
  {
    value: "Part-time",
  },
  {
    value: "Internship",
  },
  {
    value: "Apprenticeship",
  },
  {
    value: "Temporary",
  },
];

const WorkExperienceForm = (props) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [workExperience, setWorkExperience] = useState({
    jobTitle: "",
    employmentType: "",
    businessName: "",
    location: "",
    currentJob: false,
    startDate: "",
    endDate: "",
    jobDescription: "",
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    console.log("Form Props", props);
    if (props.workExperienceIdx !== "") {
      setWorkExperience(props.workData[props.workExperienceIdx]);
      setJobStartDate(props.workData[props.workExperienceIdx].startDate);
      setIsCurrentJob(props.workData[props.workExperienceIdx].currentJob);
      if (!props.workData[props.workExperienceIdx].currentJob) {
        setJobEndDate(props.workData[props.workExperienceIdx].endDate);
      }
    }
  }, []);

  const {
    jobTitle,
    employmentType,
    businessName,
    location,
    currentJob,
    startDate,
    endDate,
    jobDescription,
  } = workExperience;

  const handleChange = (event) => {
    console.log("EVENT", event);
    console.log("Work Exp", workExperience);
    if (event.target.name === "currentJob") {
      setIsCurrentJob(event.target.checked);
      setWorkExperience({
        ...workExperience,
        ["currentJob"]: event.target.checked,
      });
      if (event.target.checked) {
        setWorkExperience({ ...workExperience, ["endDate"]: "" });
        setJobEndDate("");
      }
    } else {
      setWorkExperience({
        ...workExperience,
        [event.target.name]: event.target.value,
        ["currentJob"]: isCurrentJob,
      });
    }
  };

  const handleStartDateChange = (value) => {
    setJobStartDate(value);
    if (value) {
      let dateStr = value.toString();
      setWorkExperience({ ...workExperience, ["startDate"]: dateStr });
    }
    // let dateStr = value.toString();
    // setWorkExperience({ ...workExperience, ["startDate"]: dateStr });
  };

  const handleEndDateChange = (value) => {
    setJobEndDate(value);
    if (value) {
      let dateStr = value.toString();
      setWorkExperience({ ...workExperience, ["endDate"]: dateStr });
    }
    // let dateStr = value.toString();
    // setWorkExperience({ ...workExperience, ["endDate"]: dateStr });
  };

  const addExperienceClick = (type) => {
    if (validateForm()) {
      let startDateStr = jobStartDate.toString();
      let endDateStr = "";
      if (!isCurrentJob) {
        endDateStr = jobEndDate.toString();
      }
      console.log("start", startDateStr);
      console.log("end", endDateStr);
      console.log("isCurrentJob", isCurrentJob);
      setWorkExperience({
        ...workExperience,
        ["currentJob"]: isCurrentJob,
        ["startDate"]: jobStartDate.toString(),
        ["endDate"]: endDateStr,
      });

      workExperience.currentJob = isCurrentJob;
      if (type === "add") {
        props.addWorkExperience(workExperience);
      } else if (type === "edit") {
        console.log("HERE");
        props.updateWorkExperience(workExperience, props.workExperienceIdx);
      }
      //props.addWorkExperience(workExperience);
    }

    //props.addWorkExperience(workExperience);
  };

  const validateForm = () => {
    // if (isCurrentJob !== currentJob) {
    //   currentJob = isCurrentJob;
    // }
    setWarning("");
    let invalidItems = [];
    if (!jobTitle) {
      invalidItems.push("Job Title");
    }

    if (!employmentType) {
      invalidItems.push("Employment Type");
    }
    if (!businessName) {
      invalidItems.push("Business Name");
    }

    if (!location) {
      invalidItems.push("Location");
    }
    if (startDate === "") {
      invalidItems.push("Start Date");
    }

    if (!isCurrentJob) {
      if (endDate === "") {
        invalidItems.push("End Date");
      }
    }
    if (!jobDescription) {
      invalidItems.push("Job Description");
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
          onClick={() => {
            props.workData.length
              ? props.handleReturnClick("WORK_EXP_LIST")
              : props.handleReturnClick("WORK_EXP_PROMPT");
          }}></Button>
      </div>
      <h1>Add work experience</h1>
      <FormGroup>
        <TextField
          id='job-title'
          variant='outlined'
          label='Job Title'
          name='jobTitle'
          value={jobTitle}
          onChange={handleChange}
          required
        />

        <TextField
          id='employment-type'
          select
          label='Employment Type'
          variant='outlined'
          name='employmentType'
          value={employmentType}
          onChange={handleChange}
          required>
          {employmentTypeOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='business-name'
          variant='outlined'
          label='Business Name'
          name='businessName'
          value={businessName}
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
        <FormControlLabel
          control={
            <Checkbox
              name='currentJob'
              onChange={handleChange}
              checked={isCurrentJob}
            />
          }
          label='I currently work here'
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label='Start date'
            minDate={new Date("1970-01-01")}
            maxDate={new Date()}
            name='startDate'
            value={jobStartDate}
            onChange={(newValue) => handleStartDateChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
          {!isCurrentJob ? (
            <DatePicker
              views={["year", "month"]}
              label='End date'
              minDate={new Date("1970-01-01")}
              maxDate={new Date()}
              name='endDate'
              value={jobEndDate}
              onChange={(newValue) => handleEndDateChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          ) : (
            ""
          )}
        </LocalizationProvider>
        <TextField
          variant='outlined'
          multiline
          rows={5}
          label='Job description'
          name='jobDescription'
          value={jobDescription}
          onChange={handleChange}
          required
        />
      </FormGroup>
      {warning ? <h4>{warning} required</h4> : ""}
      {props.workExperienceIdx === "" ? (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addExperienceClick("add")}>
          Add experience
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addExperienceClick("edit")}>
          Update experience
        </Button>
      )}
    </div>
  );
};

export default WorkExperienceForm;
