import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormGroup,
  TextField,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ApplicantProfile = (props) => {
  const [applicantData, setApplicantData] = useState([
    {
      industry: {},
      programmingLanguage: {},
      generalTech: {},
      softSkill: {},
      otherSkill: [],
      workExperience: [],
      courseCertificate: [],
      schoolAchievement: [],
      additionalQuestion: {},
      tagline: "",
    },
  ]);
  const [isTech, setIsTech] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    axios
      .get(`api/applicantInfo/${props.userId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setApplicantData(res.data.userData.data); // try {
        setFirstName(res.data.userData.userFirstName);
        setLastName(res.data.userData.userLastName);
        setInstitution(res.data.userData.institution);
        if (
          res.data.userData.data.industry &&
          res.data.userData.data.industry.includes("technology")
        ) {
          setIsTech(true);
        }
        console.log("what is res", res);
      });
  }, [props.userId]);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  return (
    <div className='applicant-profile'>
      <div className='return-button'>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick()}>
          Back to All User
        </Button>
      </div>
      <section className='applicant-info profile-box'>
        <h2>
          {firstName} {lastName}
        </h2>
        <h5 className='profile-box-text'>{institution}</h5>
      </section>
      <section className='tagline profile-box'>
        <div className='tagline-info'>
          <h2 style={{ fontWeight: "700" }}>3-Adjective Summary</h2>
          {applicantData.tagline ? (
            <Typography variant='h5' style={{ marginTop: "20px" }}>
              applicantData.tagline
            </Typography>
          ) : (
            <h5 className='no-data-filler-text'>No data yet</h5>
          )}
        </div>
      </section>
      <section className='top-skills profile-box'>
        <h2 className='soft-skill-header'>Top 5 Soft Skills</h2>
        {applicantData.softSkill && applicantData.softSkill.length ? (
          applicantData.softSkill.map((tech, index) => {
            return (
              <div className='soft-skill-item' key={index}>
                {index + 1}.<h4 className='skill-box-one'>{tech}</h4>
              </div>
            );
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>

      {isTech ? (
        <section className='programming-skills profile-box'>
          <h2>Programming Languages</h2>
          {applicantData.programmingLanguage &&
          applicantData.programmingLanguage.length ? (
            applicantData.programmingLanguage.map((language, index) => {
              return (
                <h4 key={index} className='skill-box-two'>
                  {language}
                </h4>
              );
            })
          ) : (
            <h5 className='no-data-filler-text'>No data yet</h5>
          )}
        </section>
      ) : (
        ""
      )}
      <section className='design-skills profile-box'>
        <h2>Design/Tech Skills</h2>
        {applicantData.generalTech && applicantData.generalTech.length ? (
          applicantData.generalTech.map((tech, index) => {
            return (
              <h4 key={index} className='skill-box-two'>
                {tech}
              </h4>
            );
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>
      <section className='other-skills profile-box'>
        <h2>Other Skills</h2>
        {applicantData.otherSkill && applicantData.otherSkill.length ? (
          applicantData.otherSkill.map((skill, index) => {
            return (
              <h4 key={index} className='skill-box-two'>
                {skill}
              </h4>
            );
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>
      <section className='work-experience profile-box'>
        <h2>Work Experience</h2>
        {applicantData.workExperience && applicantData.workExperience.length ? (
          applicantData.workExperience.map((data, index) => {
            return (
              <Card
                variant='outlined'
                className='work-experience-card'
                key={index}>
                <CardContent>
                  <div>
                    <Typography style={{ fontWeight: "700" }}>
                      {data.jobTitle}
                    </Typography>
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
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>
      <section className='courses-certificates profile-box'>
        <h2>Courses/Certificates</h2>

        {applicantData.courseCertificate &&
        applicantData.courseCertificate.length ? (
          applicantData.courseCertificate.map((data, index) => {
            return (
              <Card
                key={index}
                color='primary'
                variant='outlined'
                className='course-certificate-card'>
                <CardContent>
                  <Typography style={{ fontWeight: "700" }}>
                    {data.title}
                  </Typography>
                  <Typography>{data.issuingOrganization}</Typography>
                  <Typography>{convertDate(data.issueDate)}</Typography>
                  <Typography>{data.description}</Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>
      <section className='school-achievements profile-box'>
        <h2>School Accomplishmnets</h2>
        {applicantData.schoolAchievement &&
        applicantData.schoolAchievement.length ? (
          applicantData.schoolAchievement.map((data, index) => {
            return (
              <Card
                key={index}
                variant='outlined'
                className='work-experience-card'>
                <CardContent>
                  <Typography style={{ fontWeight: "700" }}>
                    {data.title}
                  </Typography>
                  <Typography>{data.schoolName}</Typography>
                  <Typography>{data.location}</Typography>

                  <Typography>{convertDate(data.date)}</Typography>
                  <Typography>{data.description}</Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>

      <section className='about-you profile-box'>
        <h2>About You</h2>
        {applicantData.additionalQuestion ? (
          <FormGroup>
            {Object.keys(applicantData.additionalQuestion).map((key, i) => {
              return (
                <div key={i}>
                  <label>
                    {applicantData.additionalQuestion[key].question}
                  </label>

                  <TextField
                    variant='outlined'
                    multiline
                    rows={5}
                    placeholder='Type your answer here'
                    name={key}
                    value={
                      applicantData.additionalQuestion[key].answer
                        ? applicantData.additionalQuestion[key].answer
                        : ""
                    }
                    style={{ width: "100%", margin: "10px 0px 20px 0px" }}
                    disabled
                  />
                </div>
              );
            })}
          </FormGroup>
        ) : (
          <h5 className='no-data-filler-text'>No data yet</h5>
        )}
      </section>
    </div>
  );
};

export default ApplicantProfile;
