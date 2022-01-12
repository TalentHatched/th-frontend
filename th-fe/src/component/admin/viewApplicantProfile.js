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
  const [viewPassword, setViewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(null);
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
    console.log("what is props profile", props.profileData);
    setShowPassword(false);
  }, [props.profileData]);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  const viewPasswordClick = () => {
    setViewPassword(true);
    //let code = profile.dateOfBirth.split(" ")
    //console.log('cide', code)
    console.log("date", profile.dateOfBirth);
  };

  const onHide = () => {
    setViewPassword(false);
  };

  return (
    <div>
      <div className='return-button'>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("profile")}>
          Return to dashboard
        </Button>
      </div>
      <div className='applicant-info-view'>
        <div className='applicantName '>
          {data.userFirstName && data.userLastName ? (
            <h2>
              {data.userFirstName} {data.userLastName}
            </h2>
          ) : (
            <h2>Fail</h2>
          )}
        </div>
        <div className='applicantInfo'>
          <div className='info-row'>
            <div className='info-item'>
              <label className='label-tag'>DOB:</label>{" "}
              {data.dateOfBirth ? <h5>{data.dateOfBirth}</h5> : ""}
            </div>
            <div className='info-item'>
              <label className='label-tag'>Specialization:</label>
              {data.specialization ? <h5>{data.specialization}</h5> : ""}
            </div>
          </div>
          <div className='info-row'>
            <div className='info-item'>
              <label className='label-tag'>Username:</label>
              {data.userName ? <h5>{data.userName}</h5> : ""}
            </div>
            <div className='info-item'>
              <label className='label-tag'>Grade:</label>
              {data.grade ? <h5>{data.grade}</h5> : ""}
            </div>
          </div>
          {showPassword ? (
            <div className='info-item last-item'>
              <label className='label-tag'>Password:</label>
              {viewPassword ? (
                <div className='info-item'>
                  <h5>View Password here</h5>
                  <h5 onClick={() => onHide()}>Hide</h5>
                </div>
              ) : (
                <h5 onClick={() => viewPasswordClick()}>
                  Click to view Password
                </h5>
              )}
            </div>
          ) : (
            <div className='last-item' />
          )}
        </div>
        {incompleteProfile ? (
          <div className='profile-status'>
            <Typography variant='h6'>Profile: Incomplete</Typography>
          </div>
        ) : (
          <div className='info'>
            <div className='row'>
              <div className='tagline skill-box'>
                <Card variant='outlined' style={{ height: "150px" }}>
                  <CardContent>
                    <Typography style={{ fontWeight: "700" }}>
                      Tagline
                    </Typography>
                    <Typography>
                      {profile.tagline ? profile.tagline : ""}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className='soft-skill skill-box'>
                <Card variant='outlined' style={{ height: "150px" }}>
                  <CardContent>
                    <Typography style={{ fontWeight: "700" }}>
                      Top 5 soft skills
                    </Typography>
                    <ol>
                      {profile.softSkill && profile.softSkill.length
                        ? profile.softSkill.map((skill, key) => {
                            return (
                              <div key={key} className='info-item '>
                                {key + 1}.
                                <li className='soft-skill-list' key={skill.id}>
                                  {skill}
                                </li>
                              </div>
                            );
                          })
                        : ""}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='row'>
              {profile.programmingLanguage &&
              profile.programmingLanguage.length ? (
                <div className='tech-skill skill-box'>
                  <Card variant='outlined' style={{ height: "150px" }}>
                    <CardContent>
                      <Typography style={{ fontWeight: "700" }}>
                        Programming Languages
                      </Typography>
                      <ul>
                        {profile.programmingLanguage &&
                        profile.programmingLanguage.length
                          ? profile.programmingLanguage.map((skill) => {
                              return <li className="skill-list" key={skill.id}>{skill}</li>;
                            })
                          : ""}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                ""
              )}
              {profile.generalTech && profile.generalTech.length ? (
                <div className='tech-skill skill-box'>
                  <Card variant='outlined' style={{ height: "150px" }}>
                    <CardContent>
                      <Typography style={{ fontWeight: "700" }}>
                        Additional Technical Skills
                      </Typography>
                      <ul>
                        {profile.generalTech &&
                        profile.programmingLanguage.length
                          ? profile.generalTech.map((skill) => {
                              return <li className="skill-list" key={skill.id}>{skill}</li>;
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
                <div className='tech-skill skill-box'>
                  <Card variant='outlined' style={{ height: "150px" }}>
                    <CardContent>
                      <Typography style={{ fontWeight: "700" }}>
                        Other Skills
                      </Typography>
                      <ul>
                        {profile.otherSkill && profile.otherSkill.length
                          ? profile.otherSkill.map((skill) => {
                              return <li className="skill-list" key={skill.id}>{skill}</li>;
                            })
                          : ""}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                ""
              )}
            </div>
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
                          style={{ width: "100%", display: "inline-block" }}
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
            <Accordion className='extra-question-box'>
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
