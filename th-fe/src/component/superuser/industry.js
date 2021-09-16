import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./industry.css"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import ManageFieldForm from './reusable/manageFieldForm';

//import { Delete as DeleteIcon } from '@material-ui-icons';

const Industry = () => {
  const [industries, setIndustries] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [changingIndustry, setChangingIndustry] = useState('');
  const [changingIndustryId, setChangingIndustryId] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/industry')
      .then((res) => {
        setIndustries(res.data.data);
      })

      .catch((err) => {
        console.log('what is the err, ', err.response);
      });
  }, [industries]);

  function handleAddModalOpen() {
    setOpenAdd(true);
  }

  function handleAddModalClose() {
    setOpenAdd(false);
    setChangingIndustry('');
  }

  function handleEditModalOpen(item) {
    setChangingIndustry(item.industryName);
    setChangingIndustryId(item.id);
    setOpenEdit(true);
  }

  function handleEditModalClose() {
    setOpenEdit(false);
    setChangingIndustry('');
    setChangingIndustryId();
  }

  function handleDeleteModalOpen(item) {
    setChangingIndustry(item.industryName);
    setChangingIndustryId(item.id);
    setOpenDelete(true);
  }

  function handleDeleteModalClose() {
    setOpenDelete(false);
    setChangingIndustry('');
    setChangingIndustryId();
  }

  function handleIndustryChange(event) {
    setChangingIndustry(event.target.value);
  }

  function handleAddModalSubmit() {
    if (changingIndustry) {
      let data = {industryName: changingIndustry}
      axios
        .post('http://localhost:8081/api/industry/', data)
        .then((res) => {
          if (res.data) {
            setOpenAdd(false);
            setChangingIndustry('')
          }
        })
        .catch((error) => {
          console.log('Error adding new industry', error.response);
        });
    }
  }

  function handleEditModalSubmit() {
    if (changingIndustry && changingIndustryId) {
      let data = {industryName: changingIndustry, id:changingIndustryId}
      axios.put(`http://localhost:8081/api/industry/${data.id}`, data)
      .then(res => {
        if (res.data) {
          setOpenEdit(false)
          setChangingIndustry('')
          setChangingIndustryId()
        }
      })
      .catch (error => {
        console.log('Error editing industry')
      })
    }
  }

  function handleDeleteModalSubmit() {
    if (changingIndustryId) {
      
      axios.delete(`http://localhost:8081/api/industry/${changingIndustryId}`) 
      .then (res => {
        if (res.data) {
          setOpenDelete(false)
          setChangingIndustry('')
          setChangingIndustryId()
        }
      })
      .catch (error => {
        console.log('Error deleting industry')
      })
    }
  }

  return (
    <div className="industry-table">
      <h2>Industry</h2>
      <h3>Current Industry Count: {industries.length}</h3>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        onClick={() => {
          handleAddModalOpen();
        }}>
        Add Industry
      </Button>

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
                    onClick={() => handleEditModalOpen(industry)}>
                    Edit
                  </Button>

                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteModalOpen(industry);
                    }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openAdd} onClose={handleAddModalClose}>
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
      </Modal>
    </div>
  );
};

export default Industry;
