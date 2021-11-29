import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

const ApplicantList = (props) => {
  return (
    <div>
      <h2>{props.data}</h2>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {props.data.map((applicant) => {
              <TableRow key={applicant.id}>
                <TableCell component='th' scope='row'>
                  {applicant.userFullName}
                </TableCell>
              </TableRow>;
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicantList;
