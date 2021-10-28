import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applicantDashboard.css";

import Welcome from "./onboarding/welcome";
import ApplicantProfile from "./applicantProfile";
import ParentContact from "./onboarding/parentContactForm";
import Industry from "./onboarding/industry";
import SoftSkill from "./onboarding/softSkill";
import OtherSkill from "./onboarding/otherSkill";
import WorkExperiencePrompt from "./onboarding/workExperiencePrompt";
import CourseCertificatePrompt from "./onboarding/courseCertificatePrompt";
import SchoolAchievementPrompt from "./onboarding/schoolAchievementPrompt";
import WorkExperienceForm from "./onboarding/workExperienceForm";
import WorkExperienceList from "./onboarding/workExperienceList";
import CourseCertificateForm from "./onboarding/courseCertificateForm";
import CourseCertificateList from "./onboarding/courseCertificateList";
import SchoolAchievementForm from "./onboarding/schoolAchievementForm";
import SchoolAchievementList from "./onboarding/schoolAchievementList";
import AdditionalQuestion from "./onboarding/additionalQuestion";

const ApplicantDashboard = () => {
  const initialData = {
    id: "",
    applicantId: "",
    data: {},
    under18: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    isActive: "",
    userTypeId: "",
    registrationDate: "",
    gender: "",
    dateOfBirth: "",
    userFullName: "",
    grade: "",
    specialization: "",
  };

  let userId = localStorage.getItem("userId");
  const [fullName, setFullName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [userBirthDate, setUserBirthDate] = useState("");
  const [currentPage, setCurrentPage] = useState("PROFILE");
  const [applicantData, setApplicantData] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [courseCertificate, setCourseCertificate] = useState([]);
  const [schoolAchievement, setSchoolAchievement] = useState([]);

  const [currentWorkExpIdx, setCurrentWorkExpIdx] = useState("");
  useEffect(() => {
    axios.get(`api/applicantInfo/${userId}`).then((res) => {
      console.log("What is res", res.data);
      setFullName(res.data.applicantData[0].userFullName);
      setProfileData(res.data.applicantData);
      setUserBirthDate(res.data.applicantData[0].dateOfBirth);
      if (Object.keys(res.data.applicantData[0].data.length === 0)) {
        setCurrentPage("WELCOME");
      } else {
        setCurrentPage("PROFILE");
      }
    });
  }, []);

  const handleReturnClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextPageClick = (page) => {
    console.log("What is page", page);
    setCurrentPage(page);
  };

  const handleStartClick = () => {
    setCurrentPage("PARENT_CONTACT");
  };

  const handleParentContactClick = () => {
    setCurrentPage("INDUSTRY");
  };

  const handleIndustryClick = () => {
    setCurrentPage("SOFT_SKILL");
  };

  const handleSoftSkillClick = () => {
    setCurrentPage("OTHER_SKILL");
  };

  const handleOtherSkillClick = () => {
    // Map data to list
    setCurrentPage("WORK_EXP_PROMPT");
  };

  const handleWorkExperiencePromptClick = (haveExperience) => {
    if (haveExperience) {
      setCurrentWorkExpIdx("")
      setCurrentPage("WORK_EXP_FORM");
    } else {
      setCurrentPage("COURSE_CERTIFICATE_PROMPT");
    }
  };

  const handleCertificatePromptClick = (haveCertificate) => {
    console.log("clicked");
    console.log(haveCertificate);
    if (haveCertificate) {
      setCurrentPage("COURSE_CERTIFICATE_FORM");
    } else {
      setCurrentPage("SCHOOL_ACHIEVEMENT_PROMPT");
    }
  };

  const handleSchoolAchievementClick = (haveSchoolAchievement) => {
    if (haveSchoolAchievement) {
      setCurrentPage("SCHOOL_ACHIEVEMENT_FORM");
    } else {
      setCurrentPage("ADDITIONAL_QUESTION");
    }
  };

  const addWorkExperience = (data) => {
    console.log("DATA", data);
    const updateWorkExperience = [...workExperience, data];
    console.log(updateWorkExperience);
    setWorkExperience(updateWorkExperience);
    console.log("What is work exp", workExperience);
    setCurrentPage("WORK_EXP_LIST");
  };

  const updateWorkExperience = (data, index) => {
    let updateWorkExperience = [...workExperience];
    updateWorkExperience[index] = data;
    setWorkExperience(updateWorkExperience);
    setCurrentPage("WORK_EXP_LIST");
  };

  const deleteWorkExperience = (index) => {
    let updateWorkExperience = workExperience.filter((item, idx) => {
      return idx !== index
    })
    setWorkExperience(updateWorkExperience)
    console.log('What is exp now', updateWorkExperience)
  }

  const addCourseCertificate = (data) => {
    console.log("It is clicked");
    const updateCourseCertificate = [...courseCertificate, data];
    setCourseCertificate(updateCourseCertificate);
    setCurrentPage("COURSE_CERTIFICATE_LIST");
  };

  const addSchoolAchievement = (data) => {
    const updateSchoolAchievement = [...schoolAchievement, data];
    setSchoolAchievement(updateSchoolAchievement);
    setCurrentPage("SCHOOL_ACHIEVEMENT_LIST");
  };

  const editWorkExperience = (data, idx) => {
    setCurrentWorkExpIdx(idx);
    setCurrentPage("WORK_EXP_FORM");
  };

  return (
    <div className='applicant-dashboard'>
      {currentPage === "PROFILE" ? (
        <ApplicantProfile data={applicantData} />
      ) : (
        ""
      )}
      {currentPage === "WELCOME" ? (
        <Welcome fullName={fullName} handleStartClick={handleStartClick} />
      ) : (
        ""
      )}
      {currentPage === "PARENT_CONTACT" ? (
        <ParentContact
          handleParentContactClick={handleParentContactClick}
          handleReturnClick={handleReturnClick}
        />
      ) : (
        ""
      )}
      {currentPage === "INDUSTRY" ? (
        <Industry
          handleReturnClick={handleReturnClick}
          handleIndustryClick={handleIndustryClick}
        />
      ) : (
        ""
      )}
      {currentPage === "SOFT_SKILL" ? (
        <SoftSkill
          handleReturnClick={handleReturnClick}
          handleSoftSkillClick={handleSoftSkillClick}
        />
      ) : (
        ""
      )}
      {currentPage === "OTHER_SKILL" ? (
        <OtherSkill
          handleReturnClick={handleReturnClick}
          handleOtherSkillClick={handleOtherSkillClick}
        />
      ) : (
        ""
      )}
      {currentPage === "WORK_EXP_PROMPT" ? (
        <WorkExperiencePrompt
          handleReturnClick={handleReturnClick}
          handleWorkExperiencePromptClick={handleWorkExperiencePromptClick}
        />
      ) : (
        ""
      )}
      {currentPage === "COURSE_CERTIFICATE_PROMPT" ? (
        <CourseCertificatePrompt
          handleReturnClick={handleReturnClick}
          haveWorkExperience={workExperience.length}
          handleCourseCertificatePromptClick={handleCertificatePromptClick}
        />
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_PROMPT" ? (
        <SchoolAchievementPrompt
          handleReturnClick={handleReturnClick}
          haveCertificate={courseCertificate.length}
          handleSchoolAchievementClick={handleSchoolAchievementClick}
        />
      ) : (
        ""
      )}

      {currentPage === "WORK_EXP_FORM" ? (
        <WorkExperienceForm
          handleReturnClick={handleReturnClick}
          addWorkExperience={addWorkExperience}
          updateWorkExperience={updateWorkExperience}
          workExperienceIdx={currentWorkExpIdx}
          workData={workExperience}
        />
      ) : (
        ""
      )}

      {currentPage === "WORK_EXP_LIST" ? (
        <WorkExperienceList
          handleReturnClick={handleReturnClick}
          workData={workExperience}
          handleWorkExperienceContinueClick={handleNextPageClick}
          handleNextPageClick={handleWorkExperiencePromptClick}
          editWorkExperience={editWorkExperience}
          deleteWorkExperience={deleteWorkExperience}
        />
      ) : (
        ""
      )}

      {currentPage === "COURSE_CERTIFICATE_FORM" ? (
        <CourseCertificateForm
          handleReturnClick={handleReturnClick}
          addCourseCertificate={addCourseCertificate}
          handleNextPageClick={handleNextPageClick}
        />
      ) : (
        ""
      )}

      {currentPage === "COURSE_CERTIFICATE_LIST" ? (
        <CourseCertificateList
          handleReturnClick={handleReturnClick}
          courseCertificateData={courseCertificate}
          handleCourseCertificateContinueClick={handleNextPageClick}
          handleNextPageClick={handleNextPageClick}
        />
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_FORM" ? (
        <SchoolAchievementForm
          handleReturnClick={handleReturnClick}
          addSchoolAchievement={addSchoolAchievement}
        />
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_LIST" ? (
        <SchoolAchievementList
          handleReturnClick={handleReturnClick}
          schoolAchievementData={schoolAchievement}
          handleNextPageClick={handleNextPageClick}
          handleSchoolAchievementContinueClick={handleNextPageClick}
        />
      ) : (
        ""
      )}

      {currentPage === "ADDITIONAL_QUESTION" ? <AdditionalQuestion /> : ""}
    </div>
  );
};

export default ApplicantDashboard;
