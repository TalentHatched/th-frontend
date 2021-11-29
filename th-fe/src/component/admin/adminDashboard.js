import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import ApplicantRegistrationForm from "../auth/applicantRegistration";
import ApplicantList from "./applicantList";
import axios from "axios";

const AdminDashboard = () => {
  const [showAddApplicantButton, setShowAddApplicantButton] = useState(true);
  const [applicantRegistrationWarning, setApplicantRegistrationWarning] =
    useState("");
  // const [applicantData, setApplicantData] = useState([
  //   {
  //     adminId: "",
  //     applicantId: "",
  //     dateOfBirth: "",
  //     gender: "",
  //     grade: "",
  //     isActive: "",
  //     registrationDate: "",
  //     specialization: "",
  //     userEmail: "",
  //     userFullName: "",
  //     userName: "",
  //     userTypeId: "",
  //   },
  // ]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        console.log("What is res", res.data.info);
        console.log(typeof res.data.info);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, []);

  const handleAddApplicantClick = (event) => {
    setShowAddApplicantButton(false);
  };

  const handleReturnClick = (event) => {
    setShowAddApplicantButton(true);
  };

  const handleAddStudentSubmission = (info) => {
    setApplicantRegistrationWarning("");
    console.log("What is info", info);
    axios
      .post("api/user/studentRegister", info)
      .then((res) => {
        setShowAddApplicantButton(true);
      })
      .catch((error) => {
        console.log("what is error", error.response);
        setApplicantRegistrationWarning(error.response.data.clientMessage);
      });
  };

  return (
    <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>
      <div>
        {showAddApplicantButton ? (
          <div>
            <Button
              variant='contained'
              color='primrary'
              onClick={handleAddApplicantClick}>
              Add Applicant
            </Button>
            <ApplicantList  />
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {!showAddApplicantButton ? (
          <ApplicantRegistrationForm
            handleReturnClick={handleReturnClick}
            isAdmin={true}
            handleAddStudentSubmission={handleAddStudentSubmission}
            applicantRegistrationWarning={applicantRegistrationWarning}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
