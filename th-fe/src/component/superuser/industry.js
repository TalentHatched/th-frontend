import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

//import { Delete as DeleteIcon } from '@material-ui-icons';

const Industry = () => {
  const [industries, setIndustries] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/industry')
      .then((res) => {
        setIndustries(res.data.data);
      })

      .catch((err) => {
        console.log('what is the err, ', err.response);
      });
  }, []);

  function handleAddIndustryOpen() {
    console.log('Clicked');
    setOpenAdd(true);
  }

  function handleAddIndustryClose() {
    setOpenAdd(false);
  }

  function handleEditIndustryOpen() {
    setOpenEdit(true);
  }

  function handleEditIndustryClose() {
    setOpenEdit(false);
  }

  function handleDeleteIndustryOpen() {
    setOpenDelete(true);
  }

  function handleDeleteIndustryClose() {
    setOpenDelete(false);
  }

  return (
    <div>
      <h2>Industry</h2>
      <h3>Current Industry Count: {industries.length}</h3>

      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        onClick={() => {
          handleAddIndustryOpen();
        }}>
        Add Industry
      </Button>
      <Modal open={openAdd} onClose={handleAddIndustryClose}>
        <div>
          <h1>Add Industry Modal</h1>
          <button onClick={() => handleAddIndustryClose()}>Close</button>
        </div>
      </Modal>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Industry</TableCell>
              <TableCell>Industry ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {industries.map((industry) => (
              <TableRow key={industry.industryName}>
                <TableCell component='th' scope='row'>
                  {industry.industryName}
                </TableCell>
                <TableCell align='left' scope='row'>
                  {industry.id}
                </TableCell>
                <TableCell align='left'>
                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<EditIcon />}
                    onClick={() => handleEditIndustryOpen()}>
                    Edit
                  </Button>
                  <Modal open={openEdit} onClose={handleEditIndustryClose}>
                    <div>
                      <h1>Add Industry Modal</h1>
                      <button onClick={() => handleEditIndustryClose()}>
                        Close
                      </button>
                    </div>
                  </Modal>
                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteIndustryOpen();
                    }}>
                    Delete
                  </Button>

                  <Modal open={openDelete} onClose={handleDeleteIndustryClose}>
                    <div>
                      <h1>Add Industry Modal</h1>
                      <button onClick={() => handleDeleteIndustryClose()}>
                        Close
                      </button>
                    </div>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Industry;
