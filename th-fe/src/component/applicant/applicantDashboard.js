import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applicantDashboard.css";

import Welcome from "./onboarding/welcome";
import ApplicantProfile from "./applicantProfile";
import ParentContact from "./onboarding/parentContactForm";
import Industry from "./onboarding/industry";
import ProgrammingLanguages from "./onboarding/programmingLanguages";
import GeneralTechSkill from "./onboarding/generalTechSkills";
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
import LastQuestion from "./onboarding/lastQuestion";
import ProfileComplete from "./onboarding/profileComplete";

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

  const [techTrack, setTechTrack] = useState(false);
  const [industry, setIndustry] = useState({});

  const [programmingLanguage, setProgrammingLanguage] = useState({});
  const [generalTech, setGeneralTech] = useState({});
  const [softSkill, setSoftSkill] = useState({});
  const [otherSkill, setOtherSkill] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [courseCertificate, setCourseCertificate] = useState([]);
  const [schoolAchievement, setSchoolAchievement] = useState([]);
  const [additionalQuestion, setAdditionalQuestion] = useState({});
  const [tagline, setTagline] = useState("");

  const [currentWorkExpIdx, setCurrentWorkExpIdx] = useState("");
  const [currentAchievementIdx, setCurrentAchievementIdx] = useState("");
  const [currentCourseCertificateIdx, setCurrentCourseCertificateIdx] =
    useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    axios.get(`api/applicantInfo/${userId}`).then((res) => {
      console.log("What is res", res.data);
      //setFullName(res.data.applicantData[0].userFullName);
      setFullName(res.data.userData.userFullName);
      // res.data.applicantData[0].dateOfBirth
      //   ? setUserBirthDate(res.data.applicantData[0].dateOfBirth)
      //   : setUserBirthDate("");

      if (Object.keys(res.data.userData.data).length === 0) {
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

  // Functions for Onboarding Process
  const handleStartClick = () => {
    setCurrentPage("PARENT_CONTACT");
  };

  const handleParentContactClick = () => {
    setCurrentPage("INDUSTRY");
  };

  const handleIndustryClick = (data) => {
    setIndustry(data);
    console.log("What is data", data);
    if (data.technology) {
      console.log("got here");
      setTechTrack(true);
      setCurrentPage("PROGRAMMING_LANGUAGES");
    } else {
      setCurrentPage("GENERAL_TECH_SKILL");
    }
  };

  const handleProgrammingLanguageClick = (data, type) => {
    setProgrammingLanguage(data);
    console.log("What is here");

    if (type === "onboard") {
      setCurrentPage("GENERAL_TECH_SKILL");
    } else if ((type = "update")) {
      console.log(data);
      let convertData = convertDataForSave(data, "programmingLanguage");
      let updatedData = profileData;
      updatedData.programmingLanguage = convertData;
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const handleGeneralTechClick = (data, type) => {
    setGeneralTech(data);

    if (type === "onboard") {
      setCurrentPage("SOFT_SKILL");
    } else if (type === "update") {
      let convertData = convertDataForSave(data, "generalTech");
      let updatedData = profileData;
      updatedData.generalTech = convertData;
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const handleSoftSkillClick = (data, type) => {
    setSoftSkill(data);
    if (type === "onboard") {
      setCurrentPage("OTHER_SKILL");
    } else if (type === "update") {
      let convertData = convertDataForSave(data, "softSkill");
      let updatedData = profileData;
      updatedData.softSkill = convertData;
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const handleOtherSkillClick = (data, type) => {
    // Map data to list
    setOtherSkill(data);
    if (type === "onboard") {
      setCurrentPage("WORK_EXP_PROMPT");
    } else if (type === "update") {
      console.log("What is data here", data);
      let updatedData = profileData;
      updatedData.otherSkill = data;
      setProfileData(updatedData);
      updateData();
    }
  };

  const handleWorkExperiencePromptClick = (haveExperience) => {
    if (haveExperience) {
      setCurrentWorkExpIdx("");
      setCurrentPage("WORK_EXP_FORM");
    } else {
      setCurrentPage("COURSE_CERTIFICATE_PROMPT");
    }
  };

  const handleCertificatePromptClick = (haveCertificate) => {
    console.log("clicked");
    console.log(haveCertificate);
    if (haveCertificate) {
      setCurrentCourseCertificateIdx("");
      setCurrentPage("COURSE_CERTIFICATE_FORM");
    } else {
      setCurrentPage("SCHOOL_ACHIEVEMENT_PROMPT");
    }
  };

  const handleSchoolAchievementPromptClick = (haveSchoolAchievement) => {
    if (haveSchoolAchievement) {
      setCurrentAchievementIdx("");
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

  const updateWorkExperience = (data, index, type) => {
    if (type === "edit") {
      let updateWorkExperience = [...workExperience];
      updateWorkExperience[index] = data;
      setAddNew(false);
      setWorkExperience(updateWorkExperience);
      setCurrentPage("WORK_EXP_LIST");
    } else if (type === "update") {
      //updateWorkExperienceForProfile(data, index, type)
      console.log("What is data", profileData);
      console.log(workExperience);
      console.log("index?", index);
      let updatedData = profileData;

      if (index === "newItem") {
        if (!workExperience) {
          updatedData.workExperience = [];
          updatedData.workExperience.push(data);
        } else {
          updatedData.workExperience.push(data);
        }
      } else {
        let updatedExperience = workExperience;
        updatedExperience[index] = data;
        updatedData.workExperience = updatedExperience;
      }
      // let updatedData = profileData;

      setProfileData(updatedData);
      updateData(updatedData);
      console.log("What is UPDATED DATA", updatedData);
    }
  };

  const updateAchievement = (data, index, type) => {
    if (type === "edit") {
      let updateAchievement = [...schoolAchievement];
      updateAchievement[index] = data;
      setSchoolAchievement(updateAchievement);
      setCurrentPage("SCHOOL_ACHIEVEMENT_LIST");
    } else if (type === "update") {
      let updatedData = profileData;
      if (index === "newItem") {
        if (!schoolAchievement) {
          updatedData.schoolAchievement = [];
          updatedData.schoolAchievement.push(data);
        } else {
          updatedData.schoolAchievement.push(data);
        }
      } else {
        let updatedExperience = schoolAchievement;
        updatedExperience[index] = data;
        updatedData.schoolAchievement = updatedExperience;
      }
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const updateCourseCertificate = (data, index, type) => {
    if (type === "edit") {
      let updateCourseCertificate = [...courseCertificate];
      updateCourseCertificate[index] = data;
      setCourseCertificate(updateCourseCertificate);
      setCurrentPage("COURSE_CERTIFICATE_LIST");
    } else if (type === "update") {
      let updatedData = profileData;
      if (index === "newItem") {
        if (!courseCertificate) {
          updatedData.courseCertificate = [];
          updatedData.courseCertificate.push(data);
        } else {
          updatedData.courseCertificate.push(data);
        }
      } else {
        let updatedExperience = courseCertificate;
        updatedExperience[index] = data;
        updatedData.courseCertificate = updatedExperience;
      }
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const deleteWorkExperience = (index) => {
    let updateWorkExperience = workExperience.filter((item, idx) => {
      return idx !== index;
    });
    setWorkExperience(updateWorkExperience);
    console.log("What is exp now", updateWorkExperience);
  };

  const deleteAchievement = (index) => {
    let updateAchievement = schoolAchievement.filter((item, idx) => {
      return idx !== index;
    });
    setSchoolAchievement(updateAchievement);
  };

  const deleteCourseCertificate = (index) => {
    console.log("Clicked");
    let updateCourseCertificate = courseCertificate.filter((item, idx) => {
      return idx !== index;
    });
    console.log("updateCourseCertificate", updateCourseCertificate);
    setCourseCertificate(updateCourseCertificate);
  };

  const addCourseCertificate = (data) => {
    console.log("It is clicked");
    const updateCourseCertificate = [...courseCertificate, data];
    console.log("What is course cert", updateCourseCertificate);
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

  const editAchievement = (data, idx) => {
    setCurrentAchievementIdx(idx);
    setCurrentPage("SCHOOL_ACHIEVEMENT_FORM");
  };

  const editCourseCertificate = (data, idx) => {
    console.log("What is idx", idx);
    setCurrentCourseCertificateIdx(idx);
    setCurrentPage("COURSE_CERTIFICATE_FORM");
  };

  const additionalQuestionContinueClick = (data) => {
    setAdditionalQuestion(data);
    setCurrentPage("LAST_QUESTION");
  };

  const lastQuestionContinueClick = (data) => {
    setTagline(data);
    // POST CALL HERE
    saveData();
  };

  const viewProfileClick = () => {
    setCurrentPage("PROFILE");
  };

  // Functions for Applicant Profile
  const updateSoftSkills = (data) => {
    setProfileData(data);
    console.log("DATA?", data);
    setIsUpdate(true);
    let skillRanking = {
      firstSkill: "",
      secondSkill: "",
      thirdSkill: "",
      forthSkill: "",
      fifthSkill: "",
    };
    let index = 0;
    for (const ranking in skillRanking) {
      skillRanking[ranking] = data.softSkill[index];
      index++;
    }
    console.log("Skill Ranking Now", skillRanking);
    console.log("what data here", softSkill);
    setSoftSkill(skillRanking);
    setCurrentPage("SOFT_SKILL");
  };

  const updateProgrammingSkills = (data) => {
    setProfileData(data);
    setIsUpdate(true);
    let programmingSkill = {
      HTML: false,
      CSS: false,
      JavaScript: false,
      Python: false,
    };
    data.programmingLanguage.forEach((skill) => {
      programmingSkill[skill] = true;
    });
    console.log("what now,", programmingSkill);
    setProgrammingLanguage(programmingSkill);
    setCurrentPage("PROGRAMMING_LANGUAGES");
  };

  const updateOtherSkills = (data) => {
    setProfileData(data);
    setIsUpdate(true);
    setOtherSkill(data.otherSkill);
    setCurrentPage("OTHER_SKILL");
  };

  const updateGeneralTechSkills = (data) => {
    setProfileData(data);
    setIsUpdate(true);
    let generalTechSkills = {
      Figma: false,
      AdobeXD: false,
      Photoshop: false,
      GoogleSuite: false,
      MicrosoftOffice: false,
      Slack: false,
    };
    data.generalTech.forEach((skill) => {
      generalTechSkills[skill] = true;
    });
    console.log(generalTechSkills);
    setGeneralTech(generalTechSkills);
    setCurrentPage("GENERAL_TECH_SKILL");
  };

  const updateQuestionsFromProfile = (data) => {
    setProfileData(data)
    setIsUpdate(true)
    setAdditionalQuestion(data.additionalQuestion)
    setCurrentPage('ADDITIONAL_QUESTION')
  }

  const updateItemFromProfile = (data, index, action, type) => {
    if (action === "edit") {
      switch (type) {
        case "workExperience":
          // if (type === "workExperience") {
          console.log("What is data at initial", data);
          setAddNew(false);
          setProfileData(data);
          setWorkExperience(data.workExperience);
          setCurrentWorkExpIdx(index);
          setIsUpdate(true);
          setCurrentPage("WORK_EXP_FORM");
          break;
        case "course":
          console.log("What is data here", data);
          setAddNew(false);
          setProfileData(data);
          setCourseCertificate(data.courseCertificate);
          setCurrentCourseCertificateIdx(index);
          setIsUpdate(true);
          setCurrentPage("COURSE_CERTIFICATE_FORM");
          break;

        case "accomplishment":
          setAddNew(false);
          setProfileData(data);
          setSchoolAchievement(data.schoolAchievement);
          setCurrentAchievementIdx(index);
          setIsUpdate(true);
          setCurrentPage("SCHOOL_ACHIEVEMENT_FORM");
          break;
        default:
          console.log("WRONG ACTION ON EDIT");
      }
    } else if (action === "delete") {
      let updatedData = data;
      console.log("WHAT IS DATA IN DELETE", data);
      switch (type) {
        case "workExperience":
          updatedData.workExperience = data.workExperience.filter(
            (exp, idx) => {
              return idx !== index;
            }
          );
          break;
        case "course":
          updatedData.courseCertificate = data.courseCertificate.filter(
            (exp, idx) => {
              return idx !== index;
            }
          );
          break;
        case "accomplishment":
          updatedData.schoolAchievement = data.schoolAchievement.filter(
            (exp, idx) => {
              return idx !== index;
            }
          );
          break;
        default:
          console.log("WRONG TYPE ON DELETION");
      }

      setProfileData(updatedData);
      updateData(updatedData);
      // setCurrentPage("PROFILE")
      console.log("updated Data", updatedData);
    }
  };

  const updateAdditionalQuestion = (data) => {
    let updatedData = profileData
    updatedData.additionalQuestion = data
    setProfileData(updatedData)
    updateData(updatedData)
  }

  const addNewItem = (data, type) => {
    setIsUpdate(true);
    setAddNew(true);
    setProfileData(data);
    if (type === "workExperience") {
      setCurrentWorkExpIdx("");
      setCurrentPage("WORK_EXP_FORM");
    } else if (type === "course") {
      setCurrentCourseCertificateIdx("");
      setCurrentPage("COURSE_CERTIFICATE_FORM");
    } else if (type === "accomplishment") {
      setCurrentAchievementIdx("");
      setCurrentPage("SCHOOL_ACHIEVEMENT_FORM");
    }
  };

  const convertDataForSave = (data, type) => {
    switch (type) {
      case "generalTech":
        let techArray = [];
        techArray = Object.keys(data).filter((skill) => {
          if (data[skill]) {
            return skill;
          }
        });
        return techArray;
      case "additionalQuestion":
        let questionArray = [];
        for (const item in data) {
          console.log("what is item", item);
          questionArray.push(data[item]);
        }
        return questionArray;
      case "industry":
        let industryArray = [];
        industryArray = Object.keys(data).filter((skill) => {
          if (data[skill]) {
            return skill;
          }
        });
        return industryArray;
      case "programmingLanguage":
        console.log(data);
        let languageArray = [];
        languageArray = Object.keys(data).filter((language) => {
          if (data[language]) {
            return language;
          }
        });
        return languageArray;
      case "softSkill":
        console.log("soft skill data", data);
        let softSkillArray = Object.values(data).map((skill) => {
          return skill;
        });
        return softSkillArray;
      default:
        return data;
    }
  };

  const saveData = () => {
    let applicantData = {
      applicantId: localStorage.getItem("userId"),
      data: {
        industry: convertDataForSave(industry, "industry"),
        programmingLanguage: convertDataForSave(
          programmingLanguage,
          "programmingLanguage"
        ),
        generalTech: convertDataForSave(generalTech, "generalTech"),
        softSkill: convertDataForSave(softSkill, "softSkill"),
        otherSkill: otherSkill,
        workExperience: workExperience,
        courseCertificate: courseCertificate,
        schoolAchievement: schoolAchievement,
        additionalQuestion: convertDataForSave(
          additionalQuestion,
          "additionalQuestion"
        ),
        tagline: tagline,
      },
    };
    console.log(applicantData);
    console.log("ID", userId);
    applicantData.data = JSON.stringify(applicantData.data);
    axios
      .put(`api/applicantInfo/${userId}`, applicantData)
      .then((res) => {
        if (res) {
          console.log("What is res in put request", res);
          setCurrentPage("PROFILE_COMPLETE");
        }
      })
      .catch((error) => {
        console.log("Could not save");
      });
  };

  const updateData = (data) => {
    console.log('PROFILE DATA BEFORE SAVE', profileData)
    let applicantData = {
      applicantId: localStorage.getItem("userId"),
      data: JSON.stringify(data),
    };

    
    axios
      .put(`api/applicantInfo/${userId}`, applicantData)
      .then((res) => {
        if (res) {
          console.log("What is res in put request", res);
          setCurrentPage("PROFILE");
        }
      })
      .catch((error) => {
        console.log("Could not save");
      });
  };

  return (
    <div className='applicant-dashboard'>
      {currentPage === "PROFILE" ? (
        <ApplicantProfile
          fullName={fullName}
          updateSoftSkills={updateSoftSkills}
          updateOtherSkills={updateOtherSkills}
          updateProgrammingSkills={updateProgrammingSkills}
          updateGeneralTech={updateGeneralTechSkills}
          updateItem={updateItemFromProfile}
          addNewItem={addNewItem}
          updateAdditionalQuestion={updateQuestionsFromProfile}
        />
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
          industryData={industry}
        />
      ) : (
        ""
      )}

      {currentPage === "PROGRAMMING_LANGUAGES" ? (
        <ProgrammingLanguages
          handleReturnClick={handleReturnClick}
          handleProgrammingLanguageClick={handleProgrammingLanguageClick}
          programmingLanguageData={programmingLanguage}
          isUpdate={isUpdate}
        />
      ) : (
        ""
      )}

      {currentPage === "GENERAL_TECH_SKILL" ? (
        <GeneralTechSkill
          handleReturnClick={handleReturnClick}
          handleGeneralTechClick={handleGeneralTechClick}
          techTrack={techTrack}
          generalTechData={generalTech}
          isUpdate={isUpdate}
        />
      ) : (
        " "
      )}

      {currentPage === "SOFT_SKILL" ? (
        <SoftSkill
          handleReturnClick={handleReturnClick}
          handleSoftSkillClick={handleSoftSkillClick}
          skillData={softSkill}
          techTrack={techTrack}
          isUpdate={isUpdate}
        />
      ) : (
        ""
      )}
      {currentPage === "OTHER_SKILL" ? (
        <OtherSkill
          handleReturnClick={handleReturnClick}
          handleOtherSkillClick={handleOtherSkillClick}
          otherSkillData={otherSkill}
          isUpdate={isUpdate}
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
          handleSchoolAchievementPromptClick={
            handleSchoolAchievementPromptClick
          }
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
          isUpdate={isUpdate}
          addNew={addNew}
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
          updateCourseCertificate={updateCourseCertificate}
          handleNextPageClick={handleNextPageClick}
          courseCertificateIdx={currentCourseCertificateIdx}
          courseCertificateData={courseCertificate}
          isUpdate={isUpdate}
          addNew={addNew}
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
          editCourseCertificate={editCourseCertificate}
          deleteCourseCertificate={deleteCourseCertificate}
        />
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_FORM" ? (
        <SchoolAchievementForm
          handleReturnClick={handleReturnClick}
          addSchoolAchievement={addSchoolAchievement}
          updateSchoolAchievement={updateAchievement}
          schoolAchievementIdx={currentAchievementIdx}
          achievementData={schoolAchievement}
          isUpdate={isUpdate}
          addNew={addNew}
        />
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_LIST" ? (
        <SchoolAchievementList
          handleReturnClick={handleReturnClick}
          schoolAchievementData={schoolAchievement}
          handleNextPageClick={handleSchoolAchievementPromptClick}
          handleSchoolAchievementContinueClick={handleNextPageClick}
          editAchievement={editAchievement}
          deleteAchievement={deleteAchievement}
        />
      ) : (
        ""
      )}

      {currentPage === "ADDITIONAL_QUESTION" ? (
        <AdditionalQuestion
          additionalQuestionContinueClick={additionalQuestionContinueClick}
          questionData={additionalQuestion}
          achievementData={schoolAchievement}
          handleReturnClick={handleReturnClick}
          isUpdate={isUpdate}
          updateQuestions={updateAdditionalQuestion}
        />
      ) : (
        ""
      )}

      {currentPage === "LAST_QUESTION" ? (
        <LastQuestion
          lastQuestionContinueClick={lastQuestionContinueClick}
          handleReturnClick={handleReturnClick}
        />
      ) : (
        ""
      )}
      {currentPage === "PROFILE_COMPLETE" ? (
        <ProfileComplete viewProfileClick={viewProfileClick} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ApplicantDashboard;
