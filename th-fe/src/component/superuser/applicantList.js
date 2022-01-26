import axios from "axios";
import React, { useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";

const ApplicantList = (props) => {
  const [applicantData, setApplicantData] = useState([]);
  useEffect(() => {
    axios.get(`api/applicantAdmin/admin/${props.adminId}`).then((data) => {
      setApplicantData(data.data.info);
    });
  }, [props.adminId]);

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("inOrg")}>
          Back to Organization
        </Button>
      </div>

      <Typography variant='h5' style={{ margin: "10px", textAlign: "center" }}>
        Applicants linked to {props.adminFirstName} {props.adminLastName}
      </Typography>
      {applicantData.length ? (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicantData.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell component='th' scope='row'>
                    {applicant.userFirstName}
                  </TableCell>
                  <TableCell align='left'>{applicant.userLastName}</TableCell>
                  <TableCell align='left'>{applicant.userEmail}</TableCell>
                  <TableCell align='left'>
                    {applicant.dateOfBirth ? applicant.dateOfBirth : "N/A"}
                  </TableCell>

                  <TableCell align='left' style={{ cursor: "pointer" }}>
                    {applicant.applicantId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <Typography variant="h6" style={{textAlign:"center"}}>No applicant added yet</Typography>
        </div>
      )}
    </div>
  );
};

export default ApplicantList;
