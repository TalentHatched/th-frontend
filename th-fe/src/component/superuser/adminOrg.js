import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminOrg.css";

import OrgDetail from "./orgDetail";
import ApplicantList from "./applicantList";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MergeTypeIcon from "@material-ui/icons/MergeType";

const AdminOrg = () => {
  const [adminOrgs, setAdminOrgs] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [targetId, setTargetId] = useState("");
  const [orgDetail, setOrgDetail] = useState([]);
  const [targetAdminId, setTargetAdminId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axios
      .get("api/adminOrg")
      .then((res) => {
        setAdminOrgs(res.data.data);
      })

      .catch((err) => {
        console.log("what is the err fetching AdminOrgs", err.response);
      });

    setCurrentView("ORG_LIST");
  }, []);

  const viewOrgDetail = (org) => {
    console.log("what is the id", org);
    setOrgDetail(org);
    setTargetId(org.id);
    setFirstName(org);

    setCurrentView("ORG_DETAIL");
  };

  const handleReturnClick = (type) => {
    if (type === "inOrg") {
      setCurrentView("ORG_DETAIL");
    } else {
      setCurrentView("ORG_LIST");
    }
  };

  const viewApplicantClick = (info) => {
    setTargetAdminId(info.id);
    setFirstName(info.userFirstName);
    setLastName(info.userLastName);
    setCurrentView("APPLICANT_LIST");
  };

  return (
    <div className='su-admin-tab'>
      {currentView === "ORG_LIST" ? (
        <div className='all-adminOrg-table'>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Organization Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>More Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminOrgs.map((adminOrg) => (
                  <TableRow key={adminOrg.id}>
                    <TableCell component='th' scope='row'>
                      {adminOrg.orgName}
                    </TableCell>
                    <TableCell align='left'>{adminOrg.id}</TableCell>

                    <TableCell
                      align='left'
                      style={{ cursor: "pointer" }}
                      onClick={() => viewOrgDetail(adminOrg)}>
                      See Details
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div />
      )}
      {currentView === "ORG_DETAIL" ? (
        <OrgDetail
          orgId={targetId}
          handleReturnClick={handleReturnClick}
          orgData={orgDetail}
          viewApplicantClick={viewApplicantClick}
        />
      ) : (
        <div />
      )}
      {currentView === "APPLICANT_LIST" ? (
        <div>
          <ApplicantList
            adminId={targetAdminId}
            adminFirstName={firstName}
            adminLastName={lastName}
            handleReturnClick={handleReturnClick}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default AdminOrg;
