import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./searchFilter";
import FilterListIcon from "@material-ui/icons/FilterList";
import colors from "../../keyColor";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
} from "@material-ui/core";

const ApplicantList = (props) => {
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState({
    ninth: false,
    tenth: false,
    eleventh: false,
    twelveth: false,
    technology: false,
    business: false,
    medical: false,
    retail: false,
    other: false,
    completeProfile: false,
    incompleteProfile: false,
  });
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`api/applicantAdmin/admin/${userId}`)
      .then((res) => {
        console.log(typeof res.data.info);
        setOriginalData(props.data);
        setDisplayData(props.data);
      })
      .catch((err) => {
        console.log("What is error for fetching student", err.response);
      });
  }, [props.data]);

  const onSearchFilterSelection = (e) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.checked });
  };

  const onSearchBarChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      console.log("This is called");
      if (e.target.value.length > 2) {
        let updatedDataSet = originalData.filter((data) => {
          if (
            data.userLastName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            return data;
          } else {
            return "";
          }
        });
        setDisplayData(updatedDataSet);
        setShowReset(true)
      } else {
        setDisplayData(originalData);
        setShowReset(false)
      }
    }, 1000);
  };

  const onSearchFilterUpdate = () => {
    let target = [];
    for (const option in filterValue) {
      if (filterValue[option]) {
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
          if (
            filterValue["incompleteProfile"] &&
            filterValue["completeProfile"]
          ) {
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
      setShowReset(true);
    } else {
      setDisplayData(originalData);
      setShowReset(false);
    }
    setShowFilter(false);
    console.log("What is final list", currentList);
  };

  const onResetClick = () => {
    setDisplayData(originalData);
    setShowFilter(false);
    setShowReset(false)
  };

  const handleClose = () => {
    setShowFilter(false);
  };

  return (
    <div>
      <div className='search-tools'>
        <div className='search-bar'>
          <input
            className='search-bar-input'
            type='text'
            value={searchText}
            placeholder=' Search (Name)'
            onChange={onSearchBarChange}></input>
        </div>
        <div className='filter'>
          <Button
            onClick={() => {
              setShowFilter(true);
            }}
            endIcon={<FilterListIcon />}>
            <h5>Filter</h5>
          </Button>
          {showReset ? (
            <Button
              className='reset-filter'
              onClick={() => {
                onResetClick();
              }}
              style={{ color: colors.primary }}>
              <h5>Reset Filter</h5>
            </Button>
          ) : (
            ""
          )}

          <Modal open={showFilter} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "40%",
                maxWidth: "600px",
              }}>
              <SearchFilter
                filterValue={filterValue}
                onSearchUpdateClick={onSearchFilterUpdate}
                onSearchFilterSelection={onSearchFilterSelection}
                onResetClick={onResetClick}
              />
            </Box>
          </Modal>
        </div>
      </div>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#3F67F8",
                  color: "#FFFFFF",
                  minWidth: "120px",
                  maxWidth: "220px;",
                }}>
                Last Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3F67F8",
                  color: "#FFFFFF",
                  minWidth: "120px",
                  maxWidth: "220px;",
                }}>
                First Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3F67F8",
                  color: "#FFFFFF",
                  minWidth: "150px",
                }}>
                Specialization
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3F67F8",
                  color: "#FFFFFF",
                  minWidth: "100px",
                }}>
                Grade
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3F67F8",
                  color: "#FFFFFF",
                  minWidth: "150px",
                }}>
                Profile
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData && displayData.length
              ? displayData.map((applicant, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {applicant.userLastName}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {applicant.userFirstName}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {applicant.specialization}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ width: "100%" }}>
                        {applicant.grade}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        <Button
                          variant='text'
                          onClick={() => props.onViewProfileClick(index)}>
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
