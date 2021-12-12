import React, { useState, useEffect } from "react";
import "./workExperienceList.css";

import {
  
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const WorkExperienceList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.workData);
  }, [props.workData]);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  const deleteWorkItem = (idx) => {
    let newData = data.filter((data, index) => {
      return idx !== index;
    });
    setData(newData);
    props.deleteWorkExperience(idx);
  };

  return (
    <div>
      <div>
        {/* <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("WORK_EXP_PROMPT")}></Button> */}
      </div>
      <h1>My Work Experience</h1>
      {data.map((data, index) => {
        return (
          <Card variant='outlined' className='work-experience-card' key={index}>
            <CardContent>
              <Button
                onClick={() => {
                  props.editWorkExperience(data, index);
                }}>
                Edit
              </Button>
              <Button onClick={() => deleteWorkItem(index)}>Delete</Button>
              <div>
                <Typography>{data.jobTitle}</Typography>
                <Typography>{data.employmentType}</Typography>
                <Typography>
                  {convertDate(data.startDate)} -{" "}
                  {data.endDate ? convertDate(data.endDate) : "present"}
                </Typography>
                <Typography>{data.location}</Typography>
                <Typography>{data.jobDescription}</Typography>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <div>
        <Button
          variant='outlined'
          startIcon={<AddCircleIcon />}
          onClick={() => props.handleNextPageClick(true)}>
          Add work experience
        </Button>
      </div>
      <div>
        <Button
          color='primary'
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          onClick={() =>
            props.handleWorkExperienceContinueClick("COURSE_CERTIFICATE_PROMPT")
          }>
          Continue
        </Button>{" "}
      </div>
    </div>
  );
};

export default WorkExperienceList;
