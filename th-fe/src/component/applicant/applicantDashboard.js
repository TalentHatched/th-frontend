import React, { useState, useEffect } from "react";
import axios from "axios";

import Welcome from "./onboarding/welcome";
import ParentContact from "./onboarding/parentContactForm"

const ApplicantDashboard = () => {
  let userId = localStorage.getItem("userId");
  const [fullName, setFullName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [userBirthDate, setUserBirthDate] = useState("");
  const [currentPage, setCurrentPage] = useState("WELCOME");

  useEffect(() => {
    axios.get(`api/applicantInfo/${userId}`).then((res) => {
      console.log("What is res", res.data);
      setFullName(res.data.applicantData[0].userFullName);
      setProfileData(res.data.applicantData[0].data);
      setUserBirthDate(res.data.applicantData[0].dateOfBirth);
      if (Object.keys(res.data.applicantData[0].data.length === 0)) {
        setCurrentPage("WELCOME");
      } else {
        setCurrentPage("PORTAL");
      }
    });
  }, []);

  const handleStartClick = () => {
    // 1009 - Need to figure out how to calculate age difference
    // Then lead the user to the right page
    let today = new Date();
    let studentBirthDate = new Date(userBirthDate);
    let diff = (today - studentBirthDate) / (1000 * 60 * 60 * 24);
    console.log("What is diff", diff);
    console.log("This si a test", today);
    setCurrentPage("PARENT_CONTACT");
  };

  return (
    <div className='applicant-dashboard'>
      <h1>Hello, {fullName}!</h1>
      {currentPage === "WELCOME" ? (
        <Welcome handleStartClick={handleStartClick} />
      ) : (
        ""
      )}

      {currentPage === "PARENT_CONTACT" ? <ParentContact /> : ""}
    </div>
  );
};

export default ApplicantDashboard;
