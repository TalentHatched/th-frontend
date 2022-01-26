import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import axios from "axios";

const ViewAdminProfile = (props) => {
  const [applicantData, setApplicantData] = useState([]);

  useEffect(() => {
    axios
      .get(`api/applicantAdmin/admin/${props.userId}`)
      .then((res) => {
        setApplicantData(res.data.info);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, [props.userId]);

  return (
    <div>
      <div className='return-button'>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick()}>
          Back to All User
        </Button>
      </div>
      <div className='admin-dashboard'>
        <div className='su-admin-header-box'>
          <div className='admin-info-box'>
            {props.adminInfo.institution ? (
              <div className='admin-detail'>
                <h5 className='admin-data'>{props.adminInfo.institution}</h5>
              </div>
            ) : (
              ""
            )}
            {props.adminInfo.userFirstName ? (
              <div className='admin-detail'>
                <h5 className='admin-data'>
                  {props.adminInfo.userFirstName} {props.adminInfo.userLastName}
                </h5>
              </div>
            ) : (
              ""
            )}
            {props.adminInfo.userEmail ? (
              <div className='admin-detail'>
                <h5 className='admin-data'>{props.adminInfo.userEmail}</h5>
              </div>
            ) : (
              <div />
            )}

            {applicantData.length ? (
              <div className='admin-detail'>
                <h5 className='admin-data'>
                  Linked Applicant Total: {applicantData.length}
                </h5>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        {applicantData.length ? (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Applicant First Name</TableCell>
                  <TableCell>Applicant Last Name</TableCell>
                  <TableCell>Applicant User Email</TableCell>
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
            <Typography variant='h6' style={{ textAlign: "center" }}>
              No applicant added yet
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAdminProfile;
