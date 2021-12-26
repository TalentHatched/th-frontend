import React, { useState } from "react";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import axios from "axios";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [recoveryPrompt, setRecoveryPrompt] = useState(true);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendRecoveryEmail = () => {
    console.log("Check");
    let userInfo = { userEmail: email };
    axios
      .post(`api/user/check`, userInfo)
      .then((res) => {
        console.log("email sent");
        // Take to show email screen
        setShowMessage(true);
        setRecoveryPrompt(false);
      })
      .catch((error) => {
        console.log("email not sent");
        // Error screen
      });
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.returnToLogin()}>
          Return to Login
        </Button>
      </div>

      <h2>Recover Password</h2>
      {showMessage ? (
        <div>
          <h4>
            Please check your email for next steps. It might take a few minutes.
          </h4>
          <h4>
            Didn't receive an email? Please check your spam folder or request
            another link {" "}
            <span
              onClick={() => {
                setShowMessage(false);
                setRecoveryPrompt(true);
              }}>
              here
            </span>
          </h4>
        </div>
      ) : (
        ""
      )}

      {recoveryPrompt ? (
        <div>
          <h4>Enter your email below</h4>
          <input type='text' value={email} onChange={handleChange}></input>
          <Button
            onClick={() => {
              sendRecoveryEmail();
            }}>
            Email me a recovery link
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ForgetPassword;
