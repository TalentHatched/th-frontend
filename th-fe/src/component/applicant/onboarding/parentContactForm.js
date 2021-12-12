import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import axios from "axios";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ParentContactScreen = (props) => {
  const [guardianInfo, setGuardianInfo] = useState({
    guardianName: "",
    guardianContact: "",
    applicantId: "",
  });
  const [warning, setWarning] = useState("");

  const { guardianName, guardianContact, applicantId } = guardianInfo;

  const handleChange = (event) => {
    console.log("What is event", event);
    setGuardianInfo({
      ...guardianInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitGuardianContact = () => {
    let guardianContactInfo = {
      applicantId: localStorage.getItem("userId"),
      guardianName: guardianName,
      guardianEmail: guardianContact,
      status: "CONSENT_FORM_NOT_SENT",
      consentReceived: false,
    };

    if (validateContact()) {
      console.log("What is guardianContactInfo", guardianContactInfo);
      // POST call here

      axios
        .post("api/guardian/", guardianContactInfo)
        .then((res) => {
          props.handleParentContactClick();
        })
        .catch((error) => {
          setWarning("Error saving guardian contact. Please try again later.");
        });
    }
  };

  const validateContact = () => {
    console.log("What is guardianName", guardianName);
    if (guardianName === "" || guardianContact === "") {
      setWarning("Parent/Guardian name and email required");
      return false;
    } else if (!guardianContact.includes("@")) {
      setWarning("Valid email required");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("WELCOME")}></Button>
      </div>
      <h2>
        Our data shows that you are under 18. Please provide the name and email
        of a parent or guardian who can provide parental consent to use Talent
        Hatched.
      </h2>
      <label>Name of parent or guardian</label>
      <input
        type='text'
        name='guardianName'
        value={guardianName}
        onChange={handleChange}></input>
      <label>Parent or guardian email</label>
      <input
        type='text'
        name='guardianContact'
        value={guardianContact}
        onChange={handleChange}></input>
      <div>
        {warning ? <h4>{warning}</h4> : ""}
        <Button
          variant='contained'
          color='primary'
          onClick={() => onSubmitGuardianContact()}>
          Enter name and email
        </Button>
      </div>
    </div>
  );
};

export default ParentContactScreen;
