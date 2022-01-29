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
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FilterListIcon from "@material-ui/icons/FilterList";

const ParentContact = () => {
  const [originalData, setOriginalData] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [targetIndex, setTargetIndex] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [updated, setUpdated] = useState(false);
  const [warning, setWarning] = useState("");
  const [statusOption, setStatusOption] = useState({
    CONSENT_NOT_SENT: false,
    CONSENT_SENT: false,
    CONSENT_RECEIVED: false,
  });
  const [showFilter, setShowFilter] = useState(false);

  const { CONSENT_NOT_SENT, CONSENT_SENT, CONSENT_RECEIVED } = statusOption;

  const statusKey = {
    CONSENT_RECEIVED: "Received",
    CONSENT_NOT_SENT: "Not Sent",
    CONSENT_SENT: "Sent",
  };

  useEffect(() => {
    axios
      .get("api/guardian/", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setOriginalData(res.data.data);
        setCurrentList(res.data.data);
      })

      .catch((err) => {
        console.log("what is the err, ", err.response);
      });
  }, [updated]);

  const handleUpdateClick = (id) => {
    setIsUpdating(true);
    setTargetIndex(id);
  };

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const updateContactStatus = () => {
    axios
      .put(`/api/guardian/${targetIndex}`, { status: currentStatus })
      .then((data) => {
        setUpdated(true);
        setIsUpdating(false);
        setTargetIndex("");
        setWarning("");
      })
      .catch((error) => {
        setWarning("Error updating status. Please try again later.");
      });
  };

  const handleChange = (event) => {
    setStatusOption({
      ...statusOption,
      [event.target.name]: event.target.checked,
    });
  };

  const onUpdateClick = (options) => {
    let filterItem = [];
    for (const option in options) {
      if (options[option]) {
        filterItem.push(option);
      }
    }

    if (filterItem.length === 3 || filterItem.length === 0) {
      setCurrentList(originalData);
    } else if (filterItem.length === 1) {
      let updatedList = originalData.filter(
        (data) => data.status === filterItem[0]
      );
      setCurrentList(updatedList);
    } else {
      let updatedList = originalData.filter((data) => {
        if (data.status === filterItem[0] || data.status === filterItem[1]) {
          return data;
        } else {
          return "";
        }
      });
      setCurrentList(updatedList);
    }
  };

  const resetCurrentList = () => {
    setCurrentList(originalData);
    for (const item in statusOption) {
      statusOption[item] = false;
    }
  };

  return (
    <div className='industry-table'>
      <div>
        {showFilter ? (
          <div className='parent-contact-search-tool'>
            <div className='status-labels'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={CONSENT_NOT_SENT}
                    onChange={handleChange}
                    name='CONSENT_NOT_SENT'
                  />
                }
                label='Consent Not Sent'
                labelPlacement='start'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={CONSENT_SENT}
                    onChange={handleChange}
                    name='CONSENT_SENT'
                  />
                }
                label='Consent Sent'
                labelPlacement='start'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={CONSENT_RECEIVED}
                    onChange={handleChange}
                    name='CONSENT_RECEIVED'
                  />
                }
                label='Consent Received'
                labelPlacement='start'
              />
            </div>
            <Button
              className='update-button'
              color='primary'
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              onClick={() => onUpdateClick(statusOption)}
              style={{ fontSize: "16px", margin: "10px" }}>
              <h5>Update</h5>
            </Button>
            <Button
              variant='outlined '
              style={{ fontSize: "16px" }}
              onClick={() => resetCurrentList()}>
              Reset
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setShowFilter(true);
            }}
            endIcon={<FilterListIcon />}>
            <h5>Filter</h5>
          </Button>
        )}
      </div>

      {warning !== "" ? (
        <h5 className='status-update-warning'>{warning}</h5>
      ) : (
        ""
      )}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center' style={{ minWidth: "100px" }}>
                Applicant Name
              </TableCell>
              <TableCell align='center' style={{ minWidth: "100px" }}>
                Guardian Name
              </TableCell>
              <TableCell align='center'>Guardian Contact</TableCell>
              <TableCell align='center'>Consent Status</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentList.map((info) => (
              <TableRow key={info.id}>
                <TableCell component='th' scope='row'>
                  {info.userFirstName} {info.userLastName}
                </TableCell>
                <TableCell align='left' scope='row'>
                  {info.guardianName}
                </TableCell>{" "}
                <TableCell align='left' scope='row'>
                  {info.guardianEmail}
                </TableCell>
                <TableCell align='center' scope='row'>
                  {statusKey[info.status]}
                </TableCell>
                {info.status === "CONSENT_RECEIVED" ? (
                  <TableCell align='center'>N/A</TableCell>
                ) : (
                  <TableCell align='right' style={{ minWidth: "100px" }}>
                    {!isUpdating || targetIndex !== info.applicantId ? (
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleUpdateClick(info.applicantId)}>
                        Update Status
                      </Button>
                    ) : (
                      ""
                    )}

                    {isUpdating &&
                    targetIndex === info.applicantId &&
                    info.status === "CONSENT_SENT" ? (
                      <Select
                        name='currentStatus'
                        value={
                          currentStatus === "" ? info.status : currentStatus
                        }
                        onChange={handleStatusChange}>
                        <MenuItem value={info.status} default>
                          {statusKey[info.status]}
                        </MenuItem>
                        <MenuItem value='CONSENT_RECEIVED'>
                          {statusKey["CONSENT_RECEIVED"]}
                        </MenuItem>
                      </Select>
                    ) : (
                      ""
                    )}

                    {isUpdating &&
                    targetIndex === info.applicantId &&
                    info.status === "CONSENT_NOT_SENT" ? (
                      <Select
                        name='currentStatus'
                        value={
                          currentStatus === "" ? info.status : currentStatus
                        }
                        onChange={handleStatusChange}>
                        <MenuItem value={info.status} default>
                          {statusKey[info.status]}
                        </MenuItem>
                        <MenuItem value='CONSENT_SENT'>
                          {statusKey["CONSENT_SENT"]}
                        </MenuItem>
                        <MenuItem value='CONSENT_RECEIVED'>
                          {statusKey["CONSENT_RECEIVED"]}
                        </MenuItem>
                      </Select>
                    ) : (
                      ""
                    )}

                    {isUpdating &&
                    targetIndex === info.applicantId &&
                    info.status === "CONSENT_RECEIVED"
                      ? "N/A"
                      : ""}

                    {isUpdating && targetIndex === info.applicantId ? (
                      <Button
                        variant='outlined'
                        style={{ marginLeft: "10px" }}
                        onClick={() => updateContactStatus()}>
                        Save
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ParentContact;
