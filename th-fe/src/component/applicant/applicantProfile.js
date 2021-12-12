import axios from "axios";
import React, { useState, useEffect } from "react";
import "./applicantProfile.css";

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
    axios.get(`api/applicantInfo/${userId}`).then((res) => {
      setApplicantData(res.data.userData.data); // try {
      if (
        res.data.userData.data.industry &&
        res.data.userData.data.industry.includes("technology")
      ) {
        setIsTech(true);
      }
    });
  }, []);

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
          ["workExperience"]: updatedData.workExperience,
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
          ["courseCertificate"]: updatedData.courseCertificate,
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
          ["schoolAchievement"]: updatedData,
        });
        props.updateItem(applicantData, index, "delete", type);
        break;
    }
  };

  return (
    <div>
      <section className='applicant-info'>
        <h2>{props.fullName}</h2>
        {applicantData.tagline ? <h3>{applicantData.tagline}</h3> : ""}
      </section>
      <section className='tagline'></section>
      <section className='top-skills'>
        <h2>Top 5 Soft Skills</h2>
        {applicantData.softSkill && applicantData.softSkill.length
          ? applicantData.softSkill.map((tech, index) => {
              return <h4 key={index}>{tech}</h4>;
            })
          : ""}
        <Button
          variant='outlined'
          onClick={() => props.updateSoftSkills(applicantData)}>
          Update Soft Skills
        </Button>
      </section>

      {isTech ? (
        <section className='programming-skills'>
          <h2>Programming Languages</h2>
          {applicantData.programmingLanguage &&
          applicantData.programmingLanguage.length
            ? applicantData.programmingLanguage.map((language, index) => {
                return <h4 key={index}>{language}</h4>;
              })
            : ""}
          <Button
            variant='outlined'
            onClick={() => props.updateProgrammingSkills(applicantData)}>
            Update Programming Skills
          </Button>
        </section>
      ) : (
        ""
      )}
      <section className='design-skills'>
        <h2>Design/Tech Skills</h2>
        {applicantData.generalTech && applicantData.generalTech.length
          ? applicantData.generalTech.map((tech, index) => {
              return <h4 key={index}>{tech}</h4>;
            })
          : ""}
        <Button
          variant='outlined'
          onClick={() => props.updateGeneralTech(applicantData)}>
          Update Design/Tech Skills
        </Button>
      </section>
      <section className='other-skills'>
        <h2>Other Skills</h2>
        {applicantData.otherSkill && applicantData.otherSkill.length
          ? applicantData.otherSkill.map((skill, index) => {
              return <h4 key={index}>{skill}</h4>;
            })
          : ""}
        <Button
          variant='outlined'
          onClick={() => props.updateOtherSkills(applicantData)}>
          Update Other Skills
        </Button>
      </section>
      <section className='work-experience'>
        <h2>Work Experience</h2>
        {applicantData.workExperience && applicantData.workExperience.length
          ? applicantData.workExperience.map((data, index) => {
              return (
                <Card
                  variant='outlined'
                  className='work-experience-card'
                  key={index}>
                  <CardContent>
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
                    <Button onClick={() => deleteItem(index, "workExperience")}>
                      Delete
                    </Button>
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
            })
          : ""}
        <Button
          variant='outlined'
          onClick={() => {
            props.addNewItem(applicantData, "workExperience");
          }}>
          Add Work Experience
        </Button>
      </section>
      <section className='courses-certificates'>
        <h2>Courses/Certificates</h2>

        {applicantData.courseCertificate &&
        applicantData.courseCertificate.length
          ? applicantData.courseCertificate.map((data, index) => {
              return (
                <Card
                  key={index}
                  variant='outlined'
                  className='course-certificate-card'>
                  <CardContent>
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
                    <Typography>{data.title}</Typography>
                    <Typography>{data.issuingOrganization}</Typography>
                    <Typography>{convertDate(data.issueDate)}</Typography>
                    <Typography>{data.description}</Typography>
                  </CardContent>
                </Card>
              );
            })
          : ""}
        <Button
          variant='outlined'
          onClick={() => {
            props.addNewItem(applicantData, "course");
          }}>
          Add Course / Certificate
        </Button>
      </section>
      <section className='school-achievements'>
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
                    <Button onClick={() => deleteItem(index, "accomplishment")}>
                      Delete
                    </Button>
                    <Typography>{data.title}</Typography>
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
          variant='outlined'
          onClick={() => {
            props.addNewItem(applicantData, "accomplishment");
          }}>
          Add School Accomplishments
        </Button>
      </section>

      <section className='about-you'>
        <h2>About You</h2>
        <Button onClick={() => props.updateAdditionalQuestion(applicantData)}>
          Update "Get to know you" questions
        </Button>
      </section>
    </div>
  );
};

export default ApplicantProfile;
