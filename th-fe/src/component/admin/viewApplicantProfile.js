import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ViewApplicantProfile = (props) => {
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [incompleteProfile, setIncompleteProfile] = useState(false);
  useEffect(() => {
    //let studentProfile = JSON.parse(props.profileData.data);
    // console.log('What is studentProfile', studentProfile)
    if (props.profileData.data === "{}") {
      setIncompleteProfile(true);
    } else {
      let studentProfile = JSON.parse(props.profileData.data);
      setProfile(JSON.parse(studentProfile.data));
    }
    // console.log("profile?", JSON.parse(studentProfile.data));
    setData(props.profileData);
  }, [props.profileData]);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("profile")}>
          Return to dashboard
        </Button>
      </div>
      <div>
        <div className='applicantName'>
          {data.userFullName ? <h2>{data.userFullName}</h2> : <h2>Fail</h2>}
        </div>
        <div className='applicantInfo'>
          <div>
            <label>DOB:</label>{" "}
            {data.dateOfBirth ? <h4>{data.dateOfBirth}</h4> : ""}
          </div>
          <div>
            <label>Specialization:</label>
            {data.specialization ? <h4>{data.specialization}</h4> : ""}
          </div>
          <div>
            <label>Grade:</label>
            {data.grade ? <h4>{data.grade}</h4> : ""}
          </div>
          <div>
            <label>Username:</label>
            {data.userName ? <h4>{data.userName}</h4> : ""}
          </div>
          <div>
            <label>Password:</label>
            {data.userPassword ? <h4>{data.userPassword}</h4> : ""}
          </div>
          <div>
            <label>Parent/Guardian Name:</label>
            {data.guardianName ? <h4>{data.guardianName}</h4> : ""}
          </div>
          <div>
            <label>Parent/Guardian Email:</label>
            {data.guardianEmail ? <h4>{data.guardianEmail}</h4> : ""}
          </div>

        </div>
        {incompleteProfile ? (
          <div>
            <Typography variant='h6'>Profile: Incomplete</Typography>
          </div>
        ) : (
          <div className='info'>
            <div className='tagline'>
              <Card variant='outlined'>
                <CardContent>
                  <Typography>Tagline</Typography>
                  <Typography>
                    {profile.tagline ? profile.tagline : ""}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className='soft-skill'>
              <Card variant='outlined'>
                <CardContent>
                  <Typography>Top 5 soft skills</Typography>
                  <ol>
                    {profile.softSkill && profile.softSkill.length
                      ? profile.softSkill.map((skill) => {
                          return <li key={skill.id}>{skill}</li>;
                        })
                      : ""}
                  </ol>
                </CardContent>
              </Card>
            </div>
            {profile.industry && profile.industry.includes("technology") ? (
              <div className='tech-skill'>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography>Programming Languages</Typography>
                    <ul>
                      {profile.programmingLanguage &&
                      profile.programmingLanguage.length
                        ? profile.programmingLanguage.map((skill) => {
                            return <li key={skill.id}>{skill}</li>;
                          })
                        : ""}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              ""
            )}
            {profile.otherSkill && profile.otherSkill.length ? (
              <div className='tech-skill'>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography>Other Skills</Typography>
                    <ul>
                      {profile.otherSkill && profile.otherSkill.length
                        ? profile.otherSkill.map((skill) => {
                            return <li key={skill.id}>{skill}</li>;
                          })
                        : ""}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              ""
            )}
            <Accordion className='work-experience'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Typography>View work experience</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {profile.workExperience && profile.workExperience.length ? (
                  <div>
                    {profile.workExperience.map((data, index) => {
                      return (
                        <Card
                          variant='outlined'
                          className='work-experience-card'
                          key={index}>
                          <CardContent>
                            <div>
                              <Typography>{data.jobTitle}</Typography>
                              <Typography>{data.employmentType}</Typography>
                              <Typography>
                                {convertDate(data.startDate)} -{" "}
                                {data.endDate
                                  ? convertDate(data.endDate)
                                  : "present"}
                              </Typography>
                              <Typography>{data.location}</Typography>
                              <Typography>{data.jobDescription}</Typography>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h4>No work experience</h4>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion className='course-and-cert'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Typography>View courses and certificates</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {profile.courseCertificate &&
                profile.courseCertificate.length ? (
                  <div>
                    {profile.courseCertificate.map((data, index) => {
                      return (
                        <Card
                          variant='outlined'
                          className='work-experience-card'
                          key={index}>
                          <CardContent>
                            <div>
                              <Typography>{data.title}</Typography>
                              <Typography>
                                {data.issuingOrganization}
                              </Typography>
                              <Typography>
                                {convertDate(data.issueDate)}
                              </Typography>
                              <Typography>{data.description}</Typography>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h4>No Course or Certificate</h4>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion className='school-achievement'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Typography>View school accomplishment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {profile.schoolAchievement &&
                profile.schoolAchievement.length ? (
                  <div>
                    {profile.schoolAchievement.map((data, index) => {
                      return (
                        <Card
                          variant='outlined'
                          className='work-experience-card'
                          key={index}>
                          <CardContent>
                            <div>
                              <Typography>{data.title}</Typography>
                              <Typography>{data.schoolName}</Typography>
                              <Typography>{data.location}</Typography>

                              <Typography>{convertDate(data.date)}</Typography>
                              <Typography>{data.description}</Typography>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h4>No School Accomplishment</h4>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion className='extra-question'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Typography>View "Get to know you" questions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {profile.additionalQuestion &&
                Object.entries(profile.additionalQuestion).length ? (
                  <div>
                    {Object.entries(profile.additionalQuestion).map(
                      (data, index) => {
                        console.log("What is data", data);
                        return (
                          <Card
                            variant='outlined'
                            className='work-experience-card'
                            key={index}>
                            <CardContent>
                              <div>
                                <Typography variant='subtitle1'>
                                  {data[1].question}
                                </Typography>
                                <Typography>{data[1].answer}</Typography>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div>
                    <h4>No Answers Submitted</h4>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        <div className='profile'></div>
      </div>
    </div>
  );
};

export default ViewApplicantProfile;
