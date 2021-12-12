import React, { useState, useEffect } from "react";

import { Button, FormGroup } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const CourseCertificateForm = (props) => {
  const [date, setDate] = useState("");
  const [courseCertificate, setCourseCertificate] = useState({
    title: "",
    issuingOrganization: "",
    issueDate: "",
    description: "",
  });
  const [warning, setWarning] = useState("");
  const hideItem = true;

  useEffect(() => {
    if (props.courseCertificateIdx !== "") {
      setCourseCertificate(
        props.courseCertificateData[props.courseCertificateIdx]
      );
      if (props.courseCertificateData[props.courseCertificateIdx]) {
        setDate(
          props.courseCertificateData[props.courseCertificateIdx].issueDate
        );
      }
    }
  }, [props.courseCertificateIdx, props.courseCertificateData]);

  const { title, issuingOrganization, issueDate, description } =
    courseCertificate;

  const handleChange = (event) => {
    setCourseCertificate({
      ...courseCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleIssueDateChange = (value) => {
    setDate(value);

    if (value) {
      let dateStr = value.toString();
      setCourseCertificate({ ...courseCertificate, issueDate: dateStr });
    }
  };

  const addCourseCertificateClick = (type) => {
    if (validateForm()) {
      let issueDateStr = date.toString();
      setCourseCertificate({
        ...courseCertificate,
        issueDate: issueDateStr,
      });

      if (type === "add") {
        props.addCourseCertificate(courseCertificate);
      } else if (type === "edit") {
        props.updateCourseCertificate(
          courseCertificate,
          props.courseCertificateIdx,
          "edit"
        );
      } else if (type === "update") {
        if (props.addNew) {
          props.updateCourseCertificate(courseCertificate, "newItem", "update");
        } else {
          props.updateCourseCertificate(
            courseCertificate,
            props.courseCertificateIdx,
            "update"
          );
        }
      }
    }
  };

  const validateForm = () => {
    setWarning("");
    let invalidItems = [];

    if (!title) {
      invalidItems.push("Title");
    }

    if (!issuingOrganization) {
      invalidItems.push("Issuing Organization");
    }

    let issueDateString = date.toString();
    if (issueDateString === "") {
      invalidItems.push("Issue Date");
    } else {
      setCourseCertificate({
        ...courseCertificate,
        issueDate: issueDateString,
      });
    }
    if (invalidItems.length) {
      let warningMessage = invalidItems.join(", ");
      setWarning(warningMessage);
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
          onClick={() => {
            props.isUpdate
              ? props.handleReturnClick("PROFILE")
              : props.courseCertificateData.length
              ? props.handleReturnClick("COURSE_CERTIFICATE_LIST")
              : props.handleReturnClick("COURSE_CERTIFICATE_PROMPT");
          }}></Button>
      </div>
      <h1>Add courses/certificates</h1>
      <FormGroup>
        <TextField
          id='title'
          variant='outlined'
          label='Title'
          name='title'
          value={title}
          onChange={handleChange}
          required
        />
        <TextField
          id='issuing-organization'
          variant='outlined'
          label='Issuing Organization'
          name='issuingOrganization'
          value={issuingOrganization}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label='Issue date'
            minDate={new Date("1970-01-01")}
            maxDate={new Date()}
            name='issueDate'
            value={date}
            onChange={(newValue) => handleIssueDateChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        {hideItem ? "" : <h6>{issueDate}</h6>}
        <TextField
          variant='outlined'
          multiline
          rows={5}
          label='Description'
          name='description'
          value={description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      {warning ? "" : ""}
      {props.isUpdate ? (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addCourseCertificateClick("update")}>
          {props.addNew
            ? "Add course or certificate"
            : "Update course or certificate"}
        </Button>
      ) : props.courseCertificateIdx === "" ? (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addCourseCertificateClick("add")}>
          Add course or certificate
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() => addCourseCertificateClick("edit")}>
          Edit course or certificate
        </Button>
      )}
    </div>
  );
};

export default CourseCertificateForm;
