import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./skill.css"

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

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [changingSkill, setChangingSkill] = useState('');
  const [changingSkillId, setChangingSkillId] = useState();

  useEffect(() => {
    axios
      .get('api/skill')
      .then((res) => {
        setSkills(res.data.data);
      })

      .catch((err) => {
        console.log('what is the err, ', err.response);
      });
  }, [skills]);

  function handleAddModalOpen() {
    console.log('Clicked');
    setOpenAdd(true);
  }

  function handleAddModalClose() {
    setOpenAdd(false);
    setChangingSkill('');
  }

  function handleEditModalOpen(item) {
    setOpenEdit(true);
    setChangingSkill(item.skillName);
    setChangingSkillId(item.id);
  }

  function handleEditModalClose() {
    setOpenEdit(false);
    setChangingSkill('');
    setChangingSkillId();
  }

  function handleDeleteModalOpen(item) {
    setOpenDelete(true);
    setChangingSkill(item.skillName);
    setChangingSkillId(item.id);
  }

  function handleDeleteModalClose() {
    setOpenDelete(false);
    setChangingSkill('');
    setChangingSkillId();
  }

  function handleSkillChange(event) {
    setChangingSkill(event.target.value);
  }

  function handleAddModalSubmit() {
    if (changingSkill) {
      let data = { SkillName: changingSkill };
      axios
        .post('api/skill/', data)
        .then((res) => {
          if (res.data) {
            setOpenAdd(false);
            setChangingSkill('');
          }
        })
        .catch((error) => {
          console.log('Error adding new Ssill', error.response);
        });
    }
  }

  function handleEditModalSubmit() {
    if (changingSkill && changingSkillId) {
      let data = { skillName: changingSkill, id: changingSkillId };
      axios
        .put(`api/skill/${data.id}`, data)
        .then((res) => {
          if (res.data) {
            setOpenEdit(false);
            setChangingSkill('');
            setChangingSkillId();
          }
        })
        .catch((error) => {
          console.log('Error editing skill', error.response);
        });
    }
  }

  function handleDeleteModalSubmit() {
    if (changingSkillId) {
      axios
        .delete(`api/Skill/${changingSkillId}`)
        .then((res) => {
          if (res.data) {
            setOpenDelete(false);
            setChangingSkill('');
            setChangingSkillId();
          }
        })
        .catch((error) => {
          console.log('Error deleting Skill');
        });
    }
  }

  return (
    <div className='skill-table'>
      <h2>Skill</h2>
      <h3>Current Skill Count: {skills.length}</h3>

      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        onClick={() => {
          handleAddModalOpen();
        }}>
        Add Skill
      </Button>

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
                    onClick={() => handleEditModalOpen(skill)}>
                    Edit
                  </Button>

                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteModalOpen(skill);
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
          placeholder='New Skill'
          itemLabel='Skill'
          itemTitle='Skill'
          item={changingSkill}
          closeModal={handleAddModalClose}
          onItemChange={handleSkillChange}
          onClick={handleAddModalSubmit}
        />
      </Modal>

      <Modal open={openEdit} onClose={handleEditModalClose}>
        <ManageFieldForm
          type='Edit'
          placeholder='Skill'
          itemLabel='Skill'
          itemTitle='Skill'
          item={changingSkill}
          closeModal={handleEditModalClose}
          onItemChange={handleSkillChange}
          onClick={handleEditModalSubmit}
        />
      </Modal>

      <Modal open={openDelete} onClose={handleDeleteModalClose}>
        <ManageFieldForm
          type='Delete'
          placeholder='Skill'
          itemLabel='Skill'
          itemTitle='Skill'
          item={changingSkill}
          closeModal={handleDeleteModalClose}
          onItemChange={handleSkillChange}
          onClick={handleDeleteModalSubmit}
        />
      </Modal>
    </div>
  );
};

export default Skill;
