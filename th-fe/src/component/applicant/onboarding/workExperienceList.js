import React, { useState, useEffect } from "react";

import {
  FormGroup,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  FormHelperText,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const WorkExperienceList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(props);
    setData(props.workData);
    console.log("What is data", props.workData);
  }, []);

  const convertDate = (date) => {
    let dateStr = date.split(" ")
    return dateStr[1]+" "+dateStr[3]
  }

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("WORK_EXP_PROMPT")}></Button>
      </div>
      <h1>My Work Experience</h1>
      {data.map((data) => {
        return (
          <Card variant='outlined'>
            <CardContent>
              <Typography>{data.jobTitle}</Typography>
              <Typography>{data.employmentType}</Typography>
              <Typography>
                {convertDate(data.startDate)} - {data.endDate ? convertDate(data.endDate) : "present"}
              </Typography>
              <Typography>{data.location}</Typography>
              <Typography>{data.jobDescription}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default WorkExperienceList;
