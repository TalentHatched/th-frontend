import React, { useState } from "react";
import { Button, TextField, MenuItem } from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import "./applicantRegistration.css";

const ApplicantRegistrationForm = (props) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [grade, setGrade] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [firstNameWarning, setFirstNameWarning] = useState("");
  const [lastNameWarning, setLastNameWarning] = useState("");
  const [dateOfBirthWarning, setDateOfBirthWarning] = useState("");
  const [userNameWarning, setUserNameWarning] = useState("");
  const [userEmailWarning, setUserEmailWarning] = useState("");
  const [userIdWarning, setUserIdWarning] = useState("");

  let userId = localStorage.getItem("userId");

  const specializations = [
    { value: "Technology" },
    { value: "Business" },
    { value: "Medical" },
    { value: "Retail/Hospitality" },
    { value: "Other" },
  ];

  const handleFirstNameChange = (event) => {
    setUserFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setUserLastName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    console.log(event);
    setSpecialization(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  // const handleUserPasswordChange = (event) => {
  //   setUserPassword(event.target.value);
  // };

  const handleSubmissionClick = (event) => {
    if (validate()) {
      let newApplicantInfo = {
        userName: userName,
        userEmail: userEmail,
        userPassword: "",
        dateOfBirth: dateOfBirth,
        grade: grade,
        specialization: specialization,
        userFirstName: userFirstName,
        userLastName: userLastName,
        institution: props.institution,
        adminId: parseInt(localStorage.getItem("userId")),
        isActive: true,
        userTypeId: 1,
      };
      console.log("What is newApplicantInfo", newApplicantInfo);
      props.handleAddStudentSubmission(newApplicantInfo);
    } else {
      //
      console.log("NOT READY");
    }
  };

  const validate = () => {
    let readyToSubmit = true;
    setFirstNameWarning("");
    setLastNameWarning("");
    setUserNameWarning("");
    setUserEmailWarning("");
    //setUserPasswordWarning("");
    setDateOfBirthWarning("");

    if (!userFirstName || !userLastName || !userName || !userEmail || !userId) {
      readyToSubmit = false;

      if (!userFirstName) {
        setFirstNameWarning("Applicant First Name required");
      }

      if (!userLastName) {
        setLastNameWarning("Applicant Last Name required");
      }

      if (!userName) {
        setUserNameWarning("Username required");
      }

      if (!userEmail) {
        setUserEmailWarning("Email required");
      }

      // if (!userPassword) {
      //   setUserPasswordWarning("Password required");
      // }

      if (!userId) {
        setUserIdWarning(
          "There is an error with your current session. Please login and try again"
        );
      }
    } else {
      if (userName !== userEmail) {
        setUserEmailWarning("Confirm user email does not match");
        readyToSubmit = false;
      } else if (!userName.includes("@")) {
        setUserEmailWarning("Please provide a valid email");
        readyToSubmit = false;
      }
    }

    let userType = localStorage.getItem("userTypeId");
    console.log("What is userType", typeof userType);
    if (userType !== "3") {
      readyToSubmit = false;
    }

    return readyToSubmit;
  };

  return (
    <div className='applicant-registration-form'>
      <div className='return-button'>
        <Button
         style={{ margin: "20px 10px"}}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("registration")}
         >
          Back to dashboard
        </Button>
      </div>

      <div className='new-applicant-reg-form'>
        <h2 className='new-applicant-header'>New Applicant Form</h2>
        <form>
          <div>
            <TextField
              type='text'
              variant='outlined'
              label='Applicant First Name'
              title='name'
              value={userFirstName}
              style={{ width: "75%", margin: "20px 15px" }}
              onChange={handleFirstNameChange}></TextField>
          </div>
          {firstNameWarning ? (
            <h4 className='warning'>{firstNameWarning}</h4>
          ) : (
            ""
          )}
          <div>
            <TextField
              type='text'
              variant='outlined'
              label='Applicant Last Name'
              title='name'
              value={userLastName}
              style={{ width: "75%", margin: "20px 15px" }}
              onChange={handleLastNameChange}></TextField>
          </div>
          {lastNameWarning ? (
            <h4 className='warning'>{lastNameWarning}</h4>
          ) : (
            ""
          )}

          <div>
            <TextField
              variant='outlined'
              type='date'
              title='name'
              value={dateOfBirth}
              style={{ width: "75%", margin: "20px 15px" }}
              onChange={handleDateOfBirthChange}></TextField>
          </div>
          {dateOfBirthWarning ? (
            <h4 className='warning'>{dateOfBirthWarning}</h4>
          ) : (
            ""
          )}

          <div>
            <TextField
              variant='outlined'
              label='Grade'
              type='number'
              title='grade'
              style={{ width: "75%", margin: "20px 15px" }}
              value={grade}
              onChange={handleGradeChange}></TextField>
          </div>

          <div>
            <TextField
              variant='outlined'
              select
              title='specialization'
              label='specialization'
              name='specialization'
              value={specialization}
              style={{ width: "75%", margin: "20px 15px", textAlign:"left" }}
              onChange={handleSpecializationChange}>
              {specializations.map((item, index) => {
                return (
                  <MenuItem key={index} name='item' value={item.value}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>

          <div>
            <TextField
              variant='outlined'
              type='text'
              title='username'
              label='userEmail (will be used as username)'
              value={userName}
              style={{ width: "75%", margin: "20px 15px" }}
              onChange={handleUserNameChange}></TextField>
          </div>
          {userNameWarning ? (
            <h4 className='warning'>{userNameWarning}</h4>
          ) : (
            ""
          )}

          <div>
            <TextField
              variant='outlined'
              label='Confirm User Email'
              type='text'
              title='email'
              value={userEmail}
              style={{ width: "75%", margin: "20px 15px" }}
              onChange={handleUserEmailChange}></TextField>
          </div>

          {userEmailWarning ? (
            <h4 className='warning'>{userEmailWarning}</h4>
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
            style={{ width: "75%", margin: "20px 0px" }}
            onClick={handleSubmissionClick}>
            Create Applicant Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantRegistrationForm;
