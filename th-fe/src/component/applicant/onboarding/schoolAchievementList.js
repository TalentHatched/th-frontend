import React, { useState, useEffect } from "react";

import { Button, Card, CardContent, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const SchoolAchievementList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.schoolAchievementData);
  }, []);

  const convertDate = (date) => {
    if (date) {
      let dateStr = date.split(" ");
      return dateStr[1] + " " + dateStr[3];
    } else {
      return "none";
    }
  };

  return (
    <div>
      <h1>My school achievements</h1>
      {data.map((data, index) => {
        return (
          <Card key={index} variant='outlined' className='work-experience-card'>
            <CardContent>
              <Typography>{data.title}</Typography>
              <Typography>{data.schoolName}</Typography>
              <Typography>{data.location}</Typography>

              <Typography>{convertDate(data.date)}</Typography>
              <Typography>{data.description}</Typography>
            </CardContent>
          </Card>
        );
      })}
      <div>
        <Button
          variant='outlined'
          startIcon={<AddCircleIcon />}
          onClick={() => props.handleNextPageClick("SCHOOL_ACHIEVEMENT_FORM")}>
          Add school achievement
        </Button>
      </div>
      <div>
        <Button
          color='primary'
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          onClick={() =>
            props.handleSchoolAchievementContinueClick("ADDITIONAL_QUESTION")
          }>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SchoolAchievementList;
