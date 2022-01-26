import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../util/axiosWithAuth";
import "./user.css";
import SearchFilter from "./searchFilter";
import ApplicantProfile from "./viewApplicantProfile";
import AdminProfile from "./viewAdminProfile";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { Button } from "@material-ui/core";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const User = () => {
  const [users, setUsers] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentUserList, setCurrentUserList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentView, setCurrentView] = useState("");
  const [targetApplicantId, setTargetApplicantId] = useState("");
  const [targetAdminId, setTargetAdminId] = useState("");
  const [adminInfo, setAdminInfo] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("api/user")
      .then((res) => {
        setUsers(res.data.user);
        setOriginalData(res.data.user);
        setCurrentUserList(res.data.user);
      })
      .catch((err) => {
        console.log("what is the err", err.response);
      });
    setCurrentView("ALL_USER");
  }, []);

  const onSearchFilterSelection = (criteria) => {
    if (
      (criteria.applicant && criteria.admin) ||
      (!criteria.applicant && !criteria.admin)
    ) {
      setCurrentUserList(originalData);
    } else if (criteria.applicant) {
      updateUserView("applicant");
    } else if (criteria.admin) {
      updateUserView("admin");
    }
  };

  const updateUserView = (type) => {
    let updatedArray = [];
    if (type === "applicant") {
      updatedArray = originalData.filter((user) => {
        return user.userTypeId === 1;
      });
      setCurrentUserList(updatedArray);
    } else if (type === "admin") {
      updatedArray = originalData.filter((user) => {
        return user.userTypeId === 3;
      });
      setCurrentUserList(updatedArray);
    }
  };

  const convertDate = (date) => {
    let dateStr = date.split("T");
    return dateStr[0];
  };

  const onSearchBarChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      if (e.target.value.length > 2) {
        let targetText = e.target.value.toLowerCase();
        let updatedDataSet = originalData.filter((user) => {
          if (
            (user.userFirstName &&
              user.userFirstName.toLowerCase().includes(targetText)) ||
            (user.userLastName &&
              user.userLastName.toLowerCase().includes(targetText))
          ) {
            return user;
          } else {
            return "";
          }
        });
        setCurrentUserList(updatedDataSet);
      } else {
        setCurrentUserList(originalData);
      }
    });
  };

  const onViewAccountClick = (user) => {
    if (user.userTypeId === 1) {
      setTargetApplicantId(user.id);
      setCurrentView("APPLICANT");
    } else if (user.userTypeId === 3) {
      setCurrentView("ADMIN");
      setTargetAdminId(user.id);
      setAdminInfo(user);
    }
  };

  const handleReturnClick = () => {
    setCurrentView("ALL_USER");
  };

  return (
    <div className='user-table'>
      {currentView === "ALL_USER" ? (
        <div>
          <div className='search-helper-tool'>
            <input
              className='search-bar-input-field'
              type='text'
              value={searchText}
              placeholder='Search by name'
              onChange={onSearchBarChange}
            />
            <SearchFilter onSearchUpdateClick={onSearchFilterSelection} />
          </div>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>UserName (Email)</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>User Type</TableCell>
                  <TableCell>Account Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUserList.map((user) => (
                  <TableRow key={user.userName}>
                    <TableCell component='th' scope='row'>
                      {user.userFirstName ? user.userFirstName : "N/A"}
                    </TableCell>
                    <TableCell align='left'>
                      {user.userLastName ? user.userLastName : "N/A"}
                    </TableCell>

                    <TableCell align='left'>{user.userEmail}</TableCell>
                    <TableCell align='left'>
                      {convertDate(user.registrationDate)}
                    </TableCell>
                    <TableCell align='left'>{user.userTypeId}</TableCell>

                    {user.userTypeId === 1 || user.userTypeId === 3 ? (
                      <TableCell
                        align='left'
                        style={{cursor:"pointer"}}
                        onClick={() => onViewAccountClick(user)}>
                        View Account
                      </TableCell>
                    ) : (
                      <TableCell
                        align='left'
                        onClick={() => onViewAccountClick(user)}>
                        N/A
                      </TableCell>
                    )}
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div />
      )}

      {currentView === "APPLICANT" ? (
        <ApplicantProfile
          userId={targetApplicantId}
          handleReturnClick={handleReturnClick}
        />
      ) : (
        <div />
      )}

      {currentView === "ADMIN" ? (
        <AdminProfile
          adminInfo={adminInfo}
          userId={targetAdminId}
          handleReturnClick={handleReturnClick}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default User;
