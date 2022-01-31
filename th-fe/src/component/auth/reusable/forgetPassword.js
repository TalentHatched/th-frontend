import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import axios from "axios";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [recoveryPrompt, setRecoveryPrompt] = useState(true);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendRecoveryEmail = () => {
    setLoading(true);

    if (!email) {
      setLoading(false);
      setWarning("Email required");
    }
    let userInfo = { userEmail: email };
    axios
      .post(`api/user/check`, userInfo)
      .then((res) => {
        // Take to show email screen
        setShowMessage(true);
        setRecoveryPrompt(false);
        setLoading(false);
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
      <div className='forget-password'>
        <h2>Recover Password</h2>
        {showMessage ? (
          <div className='after-message'>
            <h4>
              Please check your email for next steps. It might take a few
              minutes.
            </h4>
            <h4>
              Didn't receive an email? Please check your spam folder or request
              another link
            </h4>
            <h4
              className='here-button'
              onClick={() => {
                setShowMessage(false);
                setRecoveryPrompt(true);
              }}>
              here
            </h4>
          </div>
        ) : (
          ""
        )}

        {recoveryPrompt ? (
          <div className='recovery-prompt'>
            <input
              placeHolder='Enter your email'
              className='email-recovery-field'
              type='text'
              value={email}
              onChange={handleChange}></input>
            {loading ? <CircularProgress /> : ""}
            {warning ? <h5>{warning}</h5> : " "}
            <Button
              onClick={() => {
                sendRecoveryEmail();
              }}
              style={{ marginTop: "20px" }}>
              Email me a recovery link
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
