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
  Modal,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import ManageFieldForm from "./reusable/manageFieldForm";

//import { Delete as DeleteIcon } from '@material-ui-icons';

const ParentContact = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [changingIndustry, setChangingIndustry] = useState("");
  const [changingIndustryId, setChangingIndustryId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [targetIndex, setTargetIndex] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    axios
      .get("api/guardian/")
      .then((res) => {
        console.log("what is res", res);
        setContactInfo(res.data.data);
      })

      .catch((err) => {
        console.log("what is the err, ", err.response);
      });
  }, []);

  function handleAddModalOpen() {
    setOpenAdd(true);
  }

  function handleAddModalClose() {
    setOpenAdd(false);
    setChangingIndustry("");
  }

  function handleEditModalOpen(item) {
    setChangingIndustry(item.industryName);
    setChangingIndustryId(item.id);
    setOpenEdit(true);
  }

  function handleEditModalClose() {
    setOpenEdit(false);
    setChangingIndustry("");
    setChangingIndustryId();
  }

  function handleDeleteModalOpen(item) {
    setChangingIndustry(item.industryName);
    setChangingIndustryId(item.id);
    setOpenDelete(true);
  }

  function handleDeleteModalClose() {
    setOpenDelete(false);
    setChangingIndustry("");
    setChangingIndustryId();
  }

  function handleIndustryChange(event) {
    setChangingIndustry(event.target.value);
  }

  function handleAddModalSubmit() {
    if (changingIndustry) {
      let data = { industryName: changingIndustry };
      axios
        .post("api/industry/", data)
        .then((res) => {
          if (res.data) {
            setOpenAdd(false);
            setChangingIndustry("");
          }
        })
        .catch((error) => {
          console.log("Error adding new industry", error.response);
        });
    }
  }

  function handleEditModalSubmit() {
    if (changingIndustry && changingIndustryId) {
      let data = { industryName: changingIndustry, id: changingIndustryId };
      axios
        .put(`api/industry/${data.id}`, data)
        .then((res) => {
          if (res.data) {
            setOpenEdit(false);
            setChangingIndustry("");
            setChangingIndustryId();
          }
        })
        .catch((error) => {
          console.log("Error editing industry");
        });
    }
  }

  // function handleDeleteModalSubmit() {
  //   if (changingIndustryId) {
  //     axios
  //       .delete(`api/guardian/`)
  //       .then((res) => {
  //         if (res.data) {
  //           setOpenDelete(false);
  //           setChangingIndustry("");
  //           setChangingIndustryId();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error deleting industry");
  //       });
  //   }
  // }

  const handleUpdateClick = (id) => {
    console.log("what is update", id);
    setIsUpdating(true);
    setTargetIndex(id);
  };

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const updateContactStatus = () => {
    // update status here
    console.log('what is currentStatus', currentStatus)
    console.log('what is applicant id', targetIndex)
  }

  return (
    <div className='industry-table'>
      <h2>Parent Contact</h2>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Guardian Name</TableCell>
              <TableCell>Guardian Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactInfo.map((info) => (
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
                <TableCell align='left' scope='row'>
                  {info.status}
                </TableCell>
                <TableCell>
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
                      value={currentStatus === "" ? info.status : currentStatus}
                      onChange={handleStatusChange}>
                      <MenuItem value={info.status} default>
                        {info.status}
                      </MenuItem>
                      <MenuItem value='CONSENT_RECEIVED'>
                        CONSENT_RECEIVED
                      </MenuItem>
                    </Select>
                  ) : (
                    ""
                  )}

                  {isUpdating &&
                  targetIndex === info.applicantId &&
                  info.status === "CONSENT_FORM_NOT_SENT" ? (
                    <Select
                      name='currentStatus'
                      value={currentStatus === "" ? info.status : currentStatus}
                      onChange={handleStatusChange}>
                      <MenuItem value={info.status} default>
                        {info.status}
                      </MenuItem>
                      <MenuItem value='CONSENT_SENT'>CONSENT_SENT</MenuItem>
                      <MenuItem value='CONSENT_RECEIVED'>
                        CONSENT_RECEIVED
                      </MenuItem>
                    </Select>
                  ) : (
                    ""
                  )}

                  {isUpdating &&
                  targetIndex === info.applicantId &&
                  info.status === "CONSENT_RECEIVED" ? (
                    <Select
                      name='currentStatus'
                      value={currentStatus === "" ? info.status : currentStatus}
                      onChange={handleStatusChange}>
                      <MenuItem value={info.status} default>
                        {info.status}
                      </MenuItem>
                      <MenuItem value='CONSENT_SENT'>CONSENT_SENT</MenuItem>
                      <MenuItem value='CONSENT_NOT_SENT'>
                        CONSENT_NOT_SENT
                      </MenuItem>
                    </Select>
                  ) : (
                    ""
                  )}

                  {isUpdating && targetIndex === info.applicantId ? (
                    <Button onClick={() => updateContactStatus()}>Save</Button>
                  ) : (
                    ""
                  )}
                </TableCell>
                {/* <TableCell align='left'>

                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<EditIcon />}
                    onClick={() => handleEditModalOpen(info)}>
                    Edit
                  </Button>

                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteModalOpen(info);
                    }}>
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Modal open={openAdd} onClose={handleAddModalClose}>
        <ManageFieldForm
          type='Add'
          placeholder='New Industry'
          itemLabel='Industry'
          itemTitle='Industry'
          item={changingIndustry}
          closeModal={handleAddModalClose}
          onItemChange={handleIndustryChange}
          onClick={handleAddModalSubmit}
        />
      </Modal>

      <Modal open={openEdit} onClose={handleEditModalClose}>
        <ManageFieldForm
          type='Edit'
          placeholder='Industry'
          itemLabel='Industry'
          itemTitle='Industry'
          item={changingIndustry}
          closeModal={handleEditModalClose}
          onItemChange={handleIndustryChange}
          onClick={handleEditModalSubmit}
        />
      </Modal>

      <Modal open={openDelete} onClose={handleDeleteModalClose}>
        <ManageFieldForm
          type='Delete'
          placeholder='Industry'
          itemLabel='Industry'
          itemTitle='Industry'
          item={changingIndustry}
          closeModal={handleDeleteModalClose}
          onItemChange={handleIndustryChange}
          onClick={handleDeleteModalSubmit}
        />
      </Modal> */}
    </div>
  );
};

export default ParentContact;
