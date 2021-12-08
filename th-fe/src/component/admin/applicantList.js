import React, { useState, useEffect } from "react";
import axios from "axios";

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
  // const [applicantData, setApplicantData] = useState([
  //   {
  //     // adminId: [],
  //     // applicantId: [],
  //     // dateOfBirth: [],
  //     // gender: [],
  //     // grade: [],
  //     // isActive: [],
  //     // registrationDate: [],
  //     // specialization: [],
  //     // userEmail: [],
  //     // userFullName: [],
  //     // userName: [],
  //     // userTypeId: [],
  //   },
  // ]);

  const [applicantData, setApplicantData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        console.log("What is res", res.data.info);
        console.log(typeof res.data.info);
        setApplicantData(res.data.info);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, []);

  const onViewProfileClick = (index) => {
    console.log("what is index", index);
  };

  return (
    <div>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => console.log("data", applicantData)}>
                Name
              </TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length
              ? props.data.map((applicant, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {applicant.userFullName}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {applicant.specialization}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {applicant.grade}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        <Button onClick={() => props.onViewProfileClick(index)}>
                          {applicant.data === "{}"
                            ? "Incomplete Profile"
                            : "View Profile"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicantList;
