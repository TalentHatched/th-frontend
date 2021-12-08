import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import ApplicantRegistrationForm from "../auth/applicantRegistration";
import ApplicantList from "./applicantList";
import ViewApplicantProfile from "./viewApplicantProfile";
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
  const [applicantData, setApplicantData] = useState([]);
  const [selectedApplicantProfile, setSelectedApplicantProfile] = useState({});
  const [viewApplicantList, setViewApplicantList] = useState(false);
  const [viewApplicantProfile, setViewApplicantProfile] = useState(false);
  const [viewRegistrationForm, setViewRegistrationForm] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        console.log("What is res", res.data.info);
        console.log(typeof res.data.info);
        setApplicantData(res.data.info);
        setViewApplicantList(true)
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, []);

  const handleAddApplicantClick = (event) => {
    console.log("clicked");
    setShowAddApplicantButton(false);
    setViewApplicantList(false);
    setViewApplicantProfile(false)
    setViewRegistrationForm(true);
  };

  const handleReturnClick = (type) => {
    setShowAddApplicantButton(true);

    if (type === "profile") {
      setViewApplicantList(true);
      setViewApplicantProfile(false);
    } else if (type === "registration") {
      setViewRegistrationForm(false);
      setViewApplicantList(true);
    }
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

  const onViewProfileClick = (index) => {
    setSelectedApplicantProfile(applicantData[index]);
    setViewApplicantList(false);
    setViewApplicantProfile(true);
  };

  return (
    <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>
      <div>
        {/* {showAddApplicantButton ? (
          <div>
            <Button
              variant='contained'
              color='primrary'
              onClick={() => handleAddApplicantClick()}>
              Add Applicant
            </Button>
          </div>
        ) : (
          ""
        )} */}
      </div>
      {viewApplicantList ? (
        <div>
          <div>
            <Button
              variant='contained'
              color='primrary'
              onClick={() => handleAddApplicantClick()}>
              Add Applicant
            </Button>
          </div>
          <ApplicantList
            data={applicantData}
            onViewProfileClick={onViewProfileClick}
          />
        </div>
      ) : (
        ""
      )}

      {viewApplicantProfile ? (
        <div>
          <div>
            <Button
              variant='contained'
              color='primrary'
              onClick={() => handleAddApplicantClick()}>
              Add Applicant
            </Button>
          </div>{" "}
          <ViewApplicantProfile
            handleReturnClick={handleReturnClick}
            profileData={selectedApplicantProfile}
          />
        </div>
      ) : (
        ""
      )}

      {viewRegistrationForm ? (
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
  );
};

export default AdminDashboard;
