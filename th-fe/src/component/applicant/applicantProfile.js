import axios from "axios";
import React, { useState, useEffect } from "react";
import "./applicantProfile.css";
const ApplicantProfile = (props) => {
  const [tagline, setTagline] = useState("");
  const [otherSkill, setOtherSkill] = useState([]);
  const [fiveSkill, setFiveSkill] = useState([{}]);
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
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log("profile!!!", props);
    if (!props.data.length) {
      axios.get(`api/applicantInfo/${userId}`).then((res) => {
        console.log("What is res in porifle", res.data);
        // let userData = res.data.applicantData[0];
        // console.log(typeof userData);
        // let data = null;
        console.log(res.data);
        // setTagline(res.data.userData.data.tagline);
        // setFiveSkill(res.data.userData.softSkill);
        // setOtherSkill(res.data.userData.otherSkill);
        setApplicantData(res.data.userData.data); // try {
        //   data = JSON.parse(userData.data);
        // } catch (e) {
        //   data = userData.data;
        // }
        // console.log("data now?", typeof data);
        // console.log(data);
        // setTagline(data.tagline);
        // setFiveSkill(data.softSkill);
      });
    } else {
      let data = props.data;
      console.log("data now", data);
      setOtherSkill(data.otherSkill);
      setTagline(data.tagline);
      setFiveSkill(data.softSkill);
    }
  }, []);

  return (
    <div>
      <section className='applicant-info'>
        <h2 onClick={() => console.log(applicantData.programmingLanguage)}>
          {props.fullName}
        </h2>
        <h3>{applicantData.tagline}</h3>
      </section>
      <section className='tagline'></section>
      <section className='top-skills'>
        <h2>Top 5 Soft Skills</h2>
        {applicantData.softSkill && applicantData.softSkill.length
          ? applicantData.softSkill.map((tech, index) => {
              return <h4 key={index}>{tech}</h4>;
            })
          : ""}
      </section>
      <section className='programming-skills'>
        <h2>Programming Languages</h2>
        {applicantData.programmingLanguage &&
        applicantData.programmingLanguage.length
          ? applicantData.programmingLanguage.map((language, index) => {
              return <span key={index}>{language}</span>;
            })
          : ""}
      </section>
      <section className='design-skills'>
        <h2>Design/Tech Skills</h2>
        {applicantData.generalTech && applicantData.generalTech.length
          ? applicantData.generalTech.map((tech, index) => {
              return <span key={index}>{tech}</span>;
            })
          : ""}
      </section>
      <section className='other-skills'>
        <h2>Other Skills</h2>
        {applicantData.otherSkill && applicantData.otherSkill.length
          ? applicantData.otherSkill.map((skill, index) => {
              return <span key={index}>{skill}</span>;
            })
          : ""}
      </section>
      <section className='work-experience'>
        <h2>Work Experience</h2>
      </section>
      <section className='courses-certificates'>
        <h2>Courses/Certificates</h2>
      </section>
      <section className='school-achievements'>
        <h2>School Achievements</h2>
      </section>

      <section className='about-you'>
        <h2>About You</h2>
      </section>
    </div>
  );
};

export default ApplicantProfile;
