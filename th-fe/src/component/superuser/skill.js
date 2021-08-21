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


const Skill = () => {

  const [skills, setSkills] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/skill')
      .then((res) => {
        setSkills(res.data.data);
      })

      .catch((err) => {
        console.log('what is the err, ', err.response);
      });
  }, []);

  function handleAddSkillOpen() {
    console.log('Clicked');
    setOpenAdd(true);
  }

  function handleAddSkillClose() {
    setOpenAdd(false);
  }

  function handleEditSkillOpen() {
    setOpenEdit(true);
  }

  function handleEditSkillClose() {
    setOpenEdit(false);
  }

  function handleDeleteSkillOpen() {
    setOpenDelete(true);
  }

  function handleDeleteSkillClose() {
    setOpenDelete(false);
  }

  return (




    <div>
      <h2>Skill</h2>
      <h3>Current Skill Count: {skills.length}</h3>


      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        onClick={() => {
          handleAddSkillOpen();
        }}>
        Add Skill
      </Button>
      <Modal open={openAdd} onClose={handleAddSkillClose}>
        <div>
          <h1>Add Skill Modal</h1>
          <button onClick={() => handleAddSkillClose()}>Close</button>
        </div>
      </Modal>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell>Skill ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.skillName}>
                <TableCell component='th' scope='row'>
                  {skill.skillName}
                </TableCell>
                <TableCell align='left' scope='row'>
                  {skill.id}
                </TableCell>
                <TableCell align='left'>
                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<EditIcon />}
                    onClick={() => handleEditSkillOpen()}>
                    Edit
                  </Button>
                  <Modal open={openEdit} onClose={handleEditSkillClose}>
                    <div>
                      <h1>Add Skill Modal</h1>
                      <button onClick={() => handleEditSkillClose()}>
                        Close
                      </button>
                    </div>
                  </Modal>
                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteSkillOpen();
                    }}>
                    Delete
                  </Button>

                  <Modal open={openDelete} onClose={handleDeleteSkillClose}>
                    <div>
                      <h1>Add Skill Modal</h1>
                      <button onClick={() => handleDeleteSkillClose()}>
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

export default Skill;
