import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import ApplicantRegistrationForm from "../auth/applicantRegistration";
import ApplicantList from "./applicantList";
import ViewApplicantProfile from "./viewApplicantProfile";
import axios from "axios";
import "./adminDashboard.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const AdminDashboard = () => {
  //const [showAddApplicantButton, setShowAddApplicantButton] = useState(true);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [institution, setInstitution] = useState("");

  const [applicantRegistrationWarning, setApplicantRegistrationWarning] =
    useState("");
  const [applicantData, setApplicantData] = useState([]);
  const [selectedApplicantProfile, setSelectedApplicantProfile] = useState({});
  const [viewApplicantList, setViewApplicantList] = useState(false);
  const [viewApplicantProfile, setViewApplicantProfile] = useState(false);
  const [viewRegistrationForm, setViewRegistrationForm] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setInstitution(localStorage.getItem("institution"));
    setAdminFirstName(localStorage.getItem("userFirstName"));
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        setApplicantData(res.data.info);
        setViewApplicantList(true);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, [needUpdate]);

  const handleAddApplicantClick = (event) => {
    console.log("clicked");
    //setShowAddApplicantButton(false);
    setViewApplicantList(false);
    setViewApplicantProfile(false);
    setViewRegistrationForm(true);
  };

  const handleReturnClick = (type) => {
    // setShowAddApplicantButton(true);

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
        // setShowAddApplicantButton(true);
        setViewApplicantList(true);
        setViewRegistrationForm(false);
        setNeedUpdate(true);
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
      <div className='admin-header-box'>
        <div className='admin-info-box'>
          {institution ? (
            <div className='admin-detail'>
              <h5 className='admin-data'>{institution}</h5>
            </div>
          ) : (
            ""
          )}
          {adminFirstName ? (
            <div className='admin-detail'>
              <h5 className='admin-data'>Hello, {adminFirstName}!</h5>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className='add-applicant-button-box'>
          <Button
            variant='contained'
            color='primrary'
            startIcon={<GroupAddIcon />}
            onClick={() => handleAddApplicantClick()}>
            Add Applicant
          </Button>
        </div>
      </div>
      {viewApplicantList ? (
        <div>
          <div className='appl'>
            <ApplicantList
              data={applicantData}
              onViewProfileClick={onViewProfileClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {viewApplicantProfile ? (
        <div>
          <ViewApplicantProfile
            handleReturnClick={handleReturnClick}
            profileData={selectedApplicantProfile}
          />
        </div>
      ) : (
        ""
      )}

      {viewRegistrationForm ? (
        <div>
          <ApplicantRegistrationForm
            handleReturnClick={handleReturnClick}
            isAdmin={true}
            institution={institution}
            handleAddStudentSubmission={handleAddStudentSubmission}
            applicantRegistrationWarning={applicantRegistrationWarning}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminDashboard;
