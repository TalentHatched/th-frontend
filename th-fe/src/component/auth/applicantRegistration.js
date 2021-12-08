import React, { useState } from "react";
import { Button } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import "./applicantRegistration.css";

const ApplicantRegistrationForm = (props) => {
  const [userFullName, setUserFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [grade, setGrade] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [fullNameWarning, setFullNameWarning] = useState("");
  const [dateOfBirthWarning, setDateOfBirthWarning] = useState("");
  const [userNameWarning, setUserNameWarning] = useState("");
  const [userEmailWarning, setUserEmailWarning] = useState("");
  const [userPasswordWarning, setUserPasswordWarning] = useState("");
  const [userIdWarning, setUserIdWarning] = useState("");

  let userId = localStorage.getItem("userId");

  const handleFullNameChange = (event) => {
    setUserFullName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleSubmissionClick = (event) => {
    if (validate()) {
      let newApplicantInfo = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        dateOfBirth: dateOfBirth,
        grade: grade,
        specialization: specialization,
        userFullName: userFullName,
        adminId: 3,
        isActive: true,
        userTypeId: 1,
      };

      props.handleAddStudentSubmission(newApplicantInfo);
    } else {
      //
      console.log("NOT READY");
    }
  };

  const validate = () => {
    let readyToSubmit = true;
    setFullNameWarning("");
    setUserNameWarning("");
    setUserEmailWarning("");
    setUserPasswordWarning("");
    setDateOfBirthWarning("");

    if (!userFullName || !userName || !userEmail || !userPassword || !userId) {
      readyToSubmit = false;

      if (!userFullName) {
        setFullNameWarning("Applicant Name required");
      }

      if (!userName) {
        setUserNameWarning("Username required");
      }

      if (!userEmail) {
        setUserEmailWarning("Email required");
      }

      if (!userPassword) {
        setUserPasswordWarning("Password required");
      }

      if (!userId) {
        setUserIdWarning(
          "There is an error with your current session. Please login and try again"
        );
      }
    } else {
      if (!userEmail.includes("@")) {
        setUserEmailWarning("Please provide a valid email");
        readyToSubmit = false;
      }

      if (userPassword.length < 6) {
        setUserPasswordWarning("Password must have at least 6 characters");
        readyToSubmit = false;
      }
    }

    return readyToSubmit;
  };

  return (
    <div className='applicant-registration-form'>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("registration")}>
          Return to dashboard
        </Button>
      </div>
      <h2>New Applicant Form</h2>
      <form>
        <div>
          <label>Applicant Name</label>
          <input
            type='text'
            title='name'
            value={userFullName}
            onChange={handleFullNameChange}></input>
        </div>
        {fullNameWarning ? <h4 className='warning'>{fullNameWarning}</h4> : ""}

        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            title='name'
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}></input>
        </div>
        {dateOfBirthWarning ? (
          <h4 className='warning'>{dateOfBirthWarning}</h4>
        ) : (
          ""
        )}

        <div>
          <label>Grade</label>
          <input
            type='number'
            title='grade'
            value={grade}
            onChange={handleGradeChange}></input>
        </div>

        <div>
          <label>Specialization</label>
          <input
            type='text'
            title='specialization'
            value={specialization}
            onChange={handleSpecializationChange}></input>
        </div>

        <div>
          <label>Username</label>
          <input
            type='text'
            title='username'
            value={userName}
            onChange={handleUserNameChange}></input>
        </div>
        {userNameWarning ? <h4 className='warning'>{userNameWarning}</h4> : ""}

        <div>
          <label>User Email</label>
          <input
            type='text'
            title='email'
            value={userEmail}
            onChange={handleUserEmailChange}></input>
        </div>

        {userEmailWarning ? (
          <h4 className='warning'>{userEmailWarning}</h4>
        ) : (
          ""
        )}
        <div>
          <label>Password</label>
          <input
            type='password'
            value={userPassword}
            onChange={handleUserPasswordChange}></input>
        </div>
        {userPasswordWarning ? (
          <h4 className='warning'>{userPasswordWarning}</h4>
        ) : (
          ""
        )}

        {userIdWarning ? <h4 className='warning'>{userIdWarning}</h4> : ""}
        {props.applicantRegistrationWarning ? (
          <h4 className='warning'>{props.applicantRegistrationWarning}</h4>
        ) : (
          ""
        )}
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={handleSubmissionClick}>
          Create Applicant Account
        </Button>
      </form>
    </div>
  );
};

export default ApplicantRegistrationForm;
