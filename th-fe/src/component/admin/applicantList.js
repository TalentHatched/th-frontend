import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./searchFilter";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./applicantList.css";

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
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        console.log(typeof res.data.info);
        setApplicantData(res.data.info);
        setOriginalData(props.data);
        setDisplayData(props.data);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, [props.data]);

  const onSearchBarChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      console.log("This is called");
      if (e.target.value.length > 2) {
        let updatedDataSet = originalData.filter((data) => {
          if (data.userFullName.toLowerCase().includes(e.target.value)) {
            return data;
          } else {
            return "";
          }
        });
        setDisplayData(updatedDataSet);
      } else {
        setDisplayData(originalData);
      }
    }, 1000);
  };

  const onSearchFilterUpdate = (data) => {
    let target = [];
    for (const option in data) {
      if (data[option]) {
        target.push(option);
      }
    }
    let currentList = originalData;

    if (target.length) {
      let currentIndex = 0;
      while (target.length) {
        if (
          target[currentIndex] === "ninth" ||
          target[currentIndex] === "tenth" ||
          target[currentIndex] === "eleventh" ||
          target[currentIndex] === "twelveth"
        ) {
          currentList = currentList.filter((data) => {
            let reference = {
              ninth: "9",
              tenth: "10",
              eleventh: "11",
              twelveth: "12",
            };
            console.log(typeof data.grade);
            if (data.grade === reference[target[currentIndex]]) {
              return data;
            } else {
              return "";
            }
          });
        } else if (
          target[currentIndex] === "technology" ||
          target[currentIndex] === "medical" ||
          target[currentIndex] === "retail" ||
          target[currentIndex] === "business" ||
          target[currentIndex] === "other"
        ) {
          currentList = currentList.filter((data) => {
            if (data.specialization === target[currentIndex]) {
              return data;
            } else {
              return "";
            }
          });
        } else if (
          target[currentIndex] === "completeProfile" ||
          target[currentIndex] === "incompleteProfile"
        ) {
          if (data["incompleteProfile"] && data["completeProfile"]) {
            continue;
          } else {
            if (target[currentIndex] === "completeProfile") {
              currentList = currentList.filter((data) => {
                return data.data !== "{}";
              });
            } else if (target[currentIndex] === "incompleteProfile") {
              currentList = currentList.filter((data) => {
                return data.data === "{}";
              });
            }
          }
        }

        target.shift(target[currentIndex]);
        console.log("target", target);
      }
      setDisplayData(currentList);
    } else {
      setDisplayData(originalData);
    }
    setShowFilter(false);
    console.log("What is final list", currentList);

    // if (Object.entries(target).length) {
    //   console.log(target);
    //   let updatedDataSet = originalData.filter((data) => {
    //     if (data.grade in target && data.specialization in target) {
    //       if ("incompleteProfile" in target) {
    //         console.log("What is data here?", data);
    //       }
    //     }
    //   });
    // } else {
    //   console.log("No change");
    // }
  };

  const onResetClick = () => {
    setDisplayData(originalData);
    setShowFilter(false);
  };

  return (
    <div>
      <div className='search-bar'>
        <input
          className='search-bar-input'
          type='text'
          value={searchText}
          placeholder='Search (Name)'
          onChange={onSearchBarChange}></input>
      </div>
      <div>
        <Button
          onClick={() => {
            setShowFilter(true);
          }}
          endIcon={<FilterListIcon />}>
          Filter{" "}
        </Button>
        {showFilter ? (
          <SearchFilter
            onSearchUpdateClick={onSearchFilterUpdate}
            onResetClick={onResetClick}
          />
        ) : (
          ""
        )}
      </div>
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
            {displayData && displayData.length
              ? displayData.map((applicant, index) => {
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
