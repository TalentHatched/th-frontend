import React, { useState, useEffect } from "react";

import { Button, Card, CardContent, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const CourseCertificateList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.courseCertificateData);
  }, []);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  return (
    <div>
      <h1>My Course/Certificate</h1>
      {data.map((data, index) => {
        return (
          <Card key={index} variant='outlined' className='work-experience-card'>
            <CardContent>
              <Typography>{data.title}</Typography>
              <Typography>{data.issuingOrganization}</Typography>
              <Typography>{convertDate(data.issueDate)}</Typography>
              <Typography>{data.description}</Typography>
            </CardContent>
          </Card>
        );
      })}
      <div>
        <Button
          variant='outlined'
          startIcon={<AddCircleIcon />}
          onClick={() => props.handleNextPageClick("COURSE_CERTIFICATE_FORM")}>
          Add course/certificate
        </Button>
      </div>
      <div>
        <Button
          color='primary'
          variant='contained'
          endIcon={<ArrowForwardIcon />}
          onClick={() =>
            props.handleCourseCertificateContinueClick(
              "SCHOOL_ACHIEVEMENT_PROMPT"
            )
          }>
          Continue
        </Button>{" "}
      </div>
    </div>
  );
};

export default CourseCertificateList;
