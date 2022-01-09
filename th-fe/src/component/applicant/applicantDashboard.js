import React, { useState, useEffect } from "react";
import axios from "axios";

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

import "./applicantDashboard.css";

const ApplicantDashboard = () => {
  let userId = localStorage.getItem("userId");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [currentPage, setCurrentPage] = useState("LOADING");
  const [institution, setInstitution] = useState("");
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
  const [adjectives, setAdjectives] = useState("");

  const [currentWorkExpIdx, setCurrentWorkExpIdx] = useState("");
  const [currentAchievementIdx, setCurrentAchievementIdx] = useState("");
  const [currentCourseCertificateIdx, setCurrentCourseCertificateIdx] =
    useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    axios
      .get(`api/applicantInfo/${userId}`)
      .then((res) => {
        setFullName(res.data.userData.userFullName);
        setFirstName(res.data.userData.userFirstName);
        setLastName(res.data.userData.userLastName);
        setInstitution(res.data.userData.data.institution);
        if (Object.keys(res.data.userData.data).length === 0) {
          setCurrentPage("WELCOME");
        } else {
          setCurrentPage("PROFILE");
        }
      })
      .catch(() => {
        setCurrentPage("PROFILE");
      });
  }, [userId]);

  const handleReturnClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextPageClick = (page) => {
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
    if (data.technology) {
      setTechTrack(true);
      setCurrentPage("PROGRAMMING_LANGUAGES");
    } else {
      setCurrentPage("GENERAL_TECH_SKILL");
    }
  };

  const handleProgrammingLanguageClick = (data, type) => {
    setProgrammingLanguage(data);

    if (type === "onboard") {
      setCurrentPage("GENERAL_TECH_SKILL");
    } else if ((type = "update")) {
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
      console.log("here", data);
      console.log("what is profileData now", profileData);
      let updatedData = profileData;
      updatedData.otherSkill = data;
      setProfileData(updatedData);
      updateData(updatedData);
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
    const updateWorkExperience = [...workExperience, data];
    setWorkExperience(updateWorkExperience);
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
  };

  const deleteAchievement = (index) => {
    let updateAchievement = schoolAchievement.filter((item, idx) => {
      return idx !== index;
    });
    setSchoolAchievement(updateAchievement);
  };

  const deleteCourseCertificate = (index) => {
    let updateCourseCertificate = courseCertificate.filter((item, idx) => {
      return idx !== index;
    });
    setCourseCertificate(updateCourseCertificate);
  };

  const addCourseCertificate = (data) => {
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

  const editAchievement = (data, idx) => {
    setCurrentAchievementIdx(idx);
    setCurrentPage("SCHOOL_ACHIEVEMENT_FORM");
  };

  const editCourseCertificate = (data, idx) => {
    setCurrentCourseCertificateIdx(idx);
    setCurrentPage("COURSE_CERTIFICATE_FORM");
  };

  const additionalQuestionContinueClick = (data) => {
    setAdditionalQuestion(data);
    setCurrentPage("LAST_QUESTION");
  };

  const lastQuestionContinueClick = (data, type) => {
    if (type === "onboard") {
      saveData(data);
    } else if (type === "update") {
      console.log("What data???", data);
      let updatedData = profileData;
      updatedData.tagline = data;
      console.log("UPDATED DATA WJAT?", updatedData);
      setProfileData(updatedData);
      updateData(updatedData);
    }
  };

  const viewProfileClick = () => {
    setCurrentPage("PROFILE");
  };

  const updateAdjectives = (data) => {
    setProfileData(data);
    setIsUpdate(true);
    setAdjectives(data.tagline);
    setCurrentPage("LAST_QUESTION");
  };

  // Functions for Applicant Profile
  const updateSoftSkills = (data) => {
    setProfileData(data);
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
    setGeneralTech(generalTechSkills);
    setCurrentPage("GENERAL_TECH_SKILL");
  };

  const updateQuestionsFromProfile = (data) => {
    setProfileData(data);
    setIsUpdate(true);
    setAdditionalQuestion(data.additionalQuestion);
    setCurrentPage("ADDITIONAL_QUESTION");
  };

  const updateItemFromProfile = (data, index, action, type) => {
    if (action === "edit") {
      switch (type) {
        case "workExperience":
          // if (type === "workExperience") {
          setAddNew(false);
          setProfileData(data);
          setWorkExperience(data.workExperience);
          setCurrentWorkExpIdx(index);
          setIsUpdate(true);
          setCurrentPage("WORK_EXP_FORM");
          break;
        case "course":
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
      }
    } else if (action === "delete") {
      let updatedData = data;
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
    }
  };

  const updateAdditionalQuestion = (data) => {
    let updatedData = profileData;
    updatedData.additionalQuestion = data;
    setProfileData(updatedData);
    updateData(updatedData);
  };

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
          } else {
            return "";
          }
        });
        return techArray;
      case "additionalQuestion":
        let questionArray = [];
        for (const item in data) {
          questionArray.push(data[item]);
        }
        return questionArray;
      case "industry":
        let industryArray = [];
        industryArray = Object.keys(data).filter((skill) => {
          if (data[skill]) {
            return skill;
          } else {
            return "";
          }
        });
        return industryArray;
      case "programmingLanguage":
        let languageArray = [];
        languageArray = Object.keys(data).filter((language) => {
          if (data[language]) {
            return language;
          } else {
            return "";
          }
        });
        return languageArray;
      case "softSkill":
        let softSkillArray = Object.values(data).map((skill) => {
          return skill;
        });
        return softSkillArray;
      default:
        return data;
    }
  };

  const saveData = (taglineData) => {
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
        tagline: taglineData,
      },
    };
    applicantData.data = JSON.stringify(applicantData.data);
    axios
      .put(`api/applicantInfo/${userId}`, applicantData)
      .then((res) => {
        if (res) {
          setCurrentPage("PROFILE_COMPLETE");
        }
      })
      .catch((error) => {});
  };

  const updateData = (data) => {
    console.log("what is data on update data", data);
    let applicantData = {
      applicantId: localStorage.getItem("userId"),
      data: JSON.stringify(data),
    };

    axios
      .put(`api/applicantInfo/${userId}`, applicantData)
      .then((res) => {
        if (res) {
          setCurrentPage("PROFILE");
        }
      })
      .catch((error) => {
        console.log("Could not save");
      });
  };

  const saveNow = () => {
    console.log("fired here", programmingLanguage);
    saveData("");
  };

  const skip = (type) => {
    setCurrentPage(type);
  };


  return (
    <div className='applicant-dashboard'>
      {currentPage === "LOADING" ? <div /> : ""}

      {currentPage === "PROFILE" ? (
        <div className='profile'>
          <ApplicantProfile
            firstName={firstName}
            lastName={lastName}
            institution={institution}
            fullName={fullName}
            updateAdjectives={updateAdjectives}
            updateSoftSkills={updateSoftSkills}
            updateOtherSkills={updateOtherSkills}
            updateProgrammingSkills={updateProgrammingSkills}
            updateGeneralTech={updateGeneralTechSkills}
            updateItem={updateItemFromProfile}
            addNewItem={addNewItem}
            updateAdditionalQuestion={updateQuestionsFromProfile}
          />
        </div>
      ) : (
        <div />
      )}
      {currentPage === "WELCOME" ? (
        <div className='welcome'>
          <Welcome
            firstName={firstName}
            lastName={lastName}
            handleStartClick={handleStartClick}
          />
        </div>
      ) : (
        <div />
      )}
      {currentPage === "PARENT_CONTACT" ? (
        <div className='parentContact'>
          <ParentContact
            handleParentContactClick={handleParentContactClick}
            handleReturnClick={handleReturnClick}
          />
        </div>
      ) : (
        ""
      )}
      {currentPage === "INDUSTRY" ? (
        <div className='industry'>
          <Industry
            handleReturnClick={handleReturnClick}
            handleIndustryClick={handleIndustryClick}
            industryData={industry}
            saveNow={saveNow}
          />
        </div>
      ) : (
        ""
      )}

      {currentPage === "PROGRAMMING_LANGUAGES" ? (
        <div className='programmingLanguage'>
          <ProgrammingLanguages
            handleReturnClick={handleReturnClick}
            handleProgrammingLanguageClick={handleProgrammingLanguageClick}
            programmingLanguageData={programmingLanguage}
            isUpdate={isUpdate}
            saveNow={saveNow}
          />
        </div>
      ) : (
        ""
      )}

      {currentPage === "GENERAL_TECH_SKILL" ? (
        <div className='general-tech'>
          <GeneralTechSkill
            handleReturnClick={handleReturnClick}
            handleGeneralTechClick={handleGeneralTechClick}
            techTrack={techTrack}
            generalTechData={generalTech}
            isUpdate={isUpdate}
            saveNow={saveNow}
          />
        </div>
      ) : (
        " "
      )}

      {currentPage === "SOFT_SKILL" ? (
        <div className='softSkill'>
          <SoftSkill
            handleReturnClick={handleReturnClick}
            handleSoftSkillClick={handleSoftSkillClick}
            skillData={softSkill}
            techTrack={techTrack}
            isUpdate={isUpdate}
            saveNow={saveNow}
          />
        </div>
      ) : (
        ""
      )}
      {currentPage === "OTHER_SKILL" ? (
        <div className='otherSkill'>
          <OtherSkill
            handleReturnClick={handleReturnClick}
            handleOtherSkillClick={handleOtherSkillClick}
            otherSkillData={otherSkill}
            isUpdate={isUpdate}
            saveNow={saveNow}
            skip={skip}
          />
        </div>
      ) : (
        ""
      )}
      {currentPage === "WORK_EXP_PROMPT" ? (
        <div className='work-exp'>
          <WorkExperiencePrompt
            handleReturnClick={handleReturnClick}
            handleWorkExperiencePromptClick={handleWorkExperiencePromptClick}
          />
        </div>
      ) : (
        ""
      )}
      {currentPage === "COURSE_CERTIFICATE_PROMPT" ? (
        <div className='course-cert'>
          <CourseCertificatePrompt
            handleReturnClick={handleReturnClick}
            haveWorkExperience={workExperience.length}
            handleCourseCertificatePromptClick={handleCertificatePromptClick}
          />
        </div>
      ) : (
        ""
      )}

      {currentPage === "SCHOOL_ACHIEVEMENT_PROMPT" ? (
        <div className='school-achievement'>
          <SchoolAchievementPrompt
            handleReturnClick={handleReturnClick}
            haveCertificate={courseCertificate.length}
            handleSchoolAchievementPromptClick={
              handleSchoolAchievementPromptClick
            }
          />
        </div>
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
          skip={skip}
          saveNow={saveNow}
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
          saveNow={saveNow}
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
          skip={skip}
          saveNow={saveNow}
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
          saveNow={saveNow}
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
          skip={skip}
          saveNow={saveNow}
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
          saveNow={saveNow}
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
          skip={skip}
        />
      ) : (
        ""
      )}

      {currentPage === "LAST_QUESTION" ? (
        <LastQuestion
          lastQuestionContinueClick={lastQuestionContinueClick}
          handleReturnClick={handleReturnClick}
          adjectivesData={adjectives}
          isUpdate={isUpdate}
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
