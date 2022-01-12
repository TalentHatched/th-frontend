import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

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

  let userId = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`api/applicantInfo/${userId}`)
      .then((res) => {
        setApplicantData(res.data.userData.data); // try {
        if (
          res.data.userData.data.industry &&
          res.data.userData.data.industry.includes("technology")
        ) {
          setIsTech(true);
        }
      })
  }, [userId]);

  const convertDate = (date) => {
    let dateStr = date.split(" ");
    return dateStr[1] + " " + dateStr[3];
  };

  const deleteItem = (index, type) => {
    let updatedData = applicantData;
    switch (type) {
      case "workExperience":
        updatedData.workExperience = applicantData.workExperience.filter(
          (exp, idx) => {
            return idx !== index;
          }
        );
        setApplicantData({
          ...applicantData,
          workExperience: updatedData.workExperience,
        });
        props.updateItem(applicantData, index, "delete", type);
        break;

      case "course":
        updatedData.courseCertificate = applicantData.courseCertificate.filter(
          (exp, idx) => {
            return idx !== index;
          }
        );
        setApplicantData({
          ...applicantData,
          courseCertificate: updatedData.courseCertificate,
        });
        props.updateItem(applicantData, index, "delete", type);
        break;

      case "accomplishment":
        updatedData.schoolAchievement = applicantData.schoolAchievement.filter(
          (exp, idx) => {
            return idx !== index;
          }
        );
        setApplicantData({
          ...applicantData,
          schoolAchievement: updatedData,
        });
        props.updateItem(applicantData, index, "delete", type);
        break;
      default:
        console.log("Wrong case");
        break;
    }
  };

  return (
    <div className='applicant-profile'>
      <section className='applicant-info profile-box'>
        <h2>
          {props.firstName} {props.lastName}
        </h2>
        <h5 className="profile-box-text">{props.institution}</h5>
      </section>
      <section className='tagline profile-box'>
        {applicantData.tagline !== "" ? (
          <div className='tagline-info'>
            <h3>{applicantData.tagline}</h3>
            <Button
              color='primary'
              style={{ marginTop: "20px" }}
              onClick={() => props.updateAdjectives(applicantData)}>
              Update Adjectives
            </Button>
          </div>
        ) : (
          <div className='tagline-info'>
            <h4>No adjectives</h4>
            <Button
              color='primary'
              style={{ marginTop: "20px" }}
              onClick={() => props.updateAdjectives(applicantData)}>
              Add Adjectives
            </Button>
          </div>
        )}
      </section>
      <section className='top-skills profile-box'>
        <h2 className='soft-skill-header'>Top 5 Soft Skills</h2>
        {applicantData.softSkill && applicantData.softSkill.length
          ? applicantData.softSkill.map((tech, index) => {
              return (
                <div className='soft-skill-item' key={index}>
                  {index + 1}.
                  <h4  className='skill-box-one'>
                    {tech}
                  </h4>
                </div>
              );
            })
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => props.updateSoftSkills(applicantData)}>
          Update Soft Skills
        </Button>
      </section>

      {isTech ? (
        <section className='programming-skills profile-box'>
          <h2>Programming Languages</h2>
          {applicantData.programmingLanguage &&
          applicantData.programmingLanguage.length
            ? applicantData.programmingLanguage.map((language, index) => {
                return (
                  <h4 key={index} className='skill-box-two'>
                    {language}
                  </h4>
                );
              })
            : ""}
          <Button
            color='primary'
            style={{ marginTop: "20px" }}
            onClick={() => props.updateProgrammingSkills(applicantData)}>
            Update Programming Skills
          </Button>
        </section>
      ) : (
        ""
      )}
      <section className='design-skills profile-box'>
        <h2>Design/Tech Skills</h2>
        {applicantData.generalTech && applicantData.generalTech.length
          ? applicantData.generalTech.map((tech, index) => {
              return (
                <h4 key={index} className='skill-box-two'>
                  {tech}
                </h4>
              );
            })
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => props.updateGeneralTech(applicantData)}>
          Update Design/Tech Skills
        </Button>
      </section>
      <section className='other-skills profile-box'>
        <h2>Other Skills</h2>
        {applicantData.otherSkill && applicantData.otherSkill.length
          ? applicantData.otherSkill.map((skill, index) => {
              return (
                <h4 key={index} className='skill-box-two'>
                  {skill}
                </h4>
              );
            })
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => props.updateOtherSkills(applicantData)}>
          Update Other Skills
        </Button>
      </section>
      <section className='work-experience profile-box'>
        <h2>Work Experience</h2>
        {applicantData.workExperience && applicantData.workExperience.length
          ? applicantData.workExperience.map((data, index) => {
              return (
                <Card
                  variant='outlined'
                  className='work-experience-card'
                  key={index}>
                  <CardContent>
                    <div className='card-buttons'>
                      <Button
                        onClick={() =>
                          props.updateItem(
                            applicantData,
                            index,
                            "edit",
                            "workExperience"
                          )
                        }>
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteItem(index, "workExperience")}>
                        Delete
                      </Button>
                    </div>
                    <div>
                      <Typography style={{ fontWeight: "700" }}>{data.jobTitle}</Typography>
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
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => {
            props.addNewItem(applicantData, "workExperience");
          }}>
          Add Work Experience
        </Button>
      </section>
      <section className='courses-certificates profile-box'>
        <h2>Courses/Certificates</h2>

        {applicantData.courseCertificate &&
        applicantData.courseCertificate.length
          ? applicantData.courseCertificate.map((data, index) => {
              return (
                <Card
                  key={index}
                  color='primary'
                  variant='outlined'
                  className='course-certificate-card'>
                  <CardContent>
                    <div className='card-buttons'>
                      <Button
                        onClick={() => {
                          props.updateItem(
                            applicantData,
                            index,
                            "edit",
                            "course"
                          );
                        }}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteItem(index, "course")}>
                        Delete
                      </Button>
                    </div>
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
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => {
            props.addNewItem(applicantData, "course");
          }}>
          Add Course / Certificate
        </Button>
      </section>
      <section className='school-achievements profile-box'>
        <h2>School Accomplishmnets</h2>
        {applicantData.schoolAchievement &&
        applicantData.schoolAchievement.length
          ? applicantData.schoolAchievement.map((data, index) => {
              return (
                <Card
                  key={index}
                  variant='outlined'
                  className='work-experience-card'>
                  <CardContent>
                    <div className='card-buttons'>
                      <Button
                        onClick={() => {
                          props.updateItem(
                            applicantData,
                            index,
                            "edit",
                            "accomplishment"
                          );
                        }}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteItem(index, "accomplishment")}>
                        Delete
                      </Button>
                    </div>
                    <Typography style={{ fontWeight: "700" }} >{data.title}</Typography>
                    <Typography>{data.schoolName}</Typography>
                    <Typography>{data.location}</Typography>

                    <Typography>{convertDate(data.date)}</Typography>
                    <Typography>{data.description}</Typography>
                  </CardContent>
                </Card>
              );
            })
          : ""}
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => {
            props.addNewItem(applicantData, "accomplishment");
          }}>
          Add School Accomplishments
        </Button>
      </section>

      <section className='about-you profile-box'>
        <h2>About You</h2>
        <Button
          color='primary'
          style={{ marginTop: "20px" }}
          onClick={() => props.updateAdditionalQuestion(applicantData)}>
          Update "Get to know you" questions
        </Button>
      </section>
    </div>
  );
};

export default ApplicantProfile;
