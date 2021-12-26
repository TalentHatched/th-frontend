import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [warning, setWarning] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let token = props.location.pathname.split("/");
    console.log("what is token", token[2]);
    axios
      .get("/api/user/findUser", { params: { resetPasswordToken: token[2] } })
      .then((response) => {
        console.log("What is response", response);
        if (response.data.validToken) {
          setValidToken(true);
          setUserId(response.data.data.id);
        }
      })
      .catch((error) => {
        console.log("error", error.data);
      });
  }, [props.location]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onResetPasswordClick = () => {
    if (validate()) {
      let data = { id: userId, password: password };
      axios
        .put("/api/user/updatePassword", data)
        .then((response) => {
          props.history.push("/#/adminlogin")
        })
        .catch((error) => {
          setWarning("Unable to update password. Please try again later")
        });
    }
  };

  const validate = () => {
    let readyToSubmit = true;
    if (password !== confirmPassword) {
      setWarning("Passwords do not match. Please try again.");
      readyToSubmit = false;
    } else if (password.length < 6) {
      setWarning("Password must have at least 6 characters");
      readyToSubmit = false;
    }
    let letterOnly = /^[A-Za-z]+$/.test(password);
    let numOnly = /^\d+$/.test(password);

    if (numOnly || letterOnly) {
      setWarning("Password must contain at least 1 number and 1 character");
      readyToSubmit = false;
    }

    return readyToSubmit;
  };

  return (
    <div>
      {validToken ? (
        <div>
          <h2>Reset Password</h2>
          <form>
            <h4>Enter your email below</h4>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handlePasswordChange}></input>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}></input>
            {warning ? <h4>{warning}</h4> : ""}
            <Button
              onClick={() => {
                onResetPasswordClick();
              }}>
              Reset Password
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Your token is invalid</h2>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
