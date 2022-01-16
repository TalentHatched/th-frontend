import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './adminOrg.css';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@material-ui/core';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MergeTypeIcon from '@material-ui/icons/MergeType';

const AdminOrg = () => {
  const [adminOrgs, setAdminOrgs] = useState([]);
  const [newAdminOrgs, setNewAdminOrgs] = useState([]);
  useEffect(() => {
    axios
      .get('api/adminOrg')
      .then((res) => {
        setAdminOrgs(res.data.data);
        setNewAdminOrgs(getNewAdminOrgs(res.data.data));
      })

      .catch((err) => {
        console.log('what is the err fetching AdminOrgs', err.response);
      });
  }, []);

  function getNewAdminOrgs(data) {
    return data.filter((data) => !data.reviewed);
  }

  function handleApproveClick(adminOrg) {
    let targetId = adminOrg.id;
    let data = { reviewed: true };
    axios
      .put(`api/adminOrg/${targetId}`, data)
      .then((res) => {
        console.log('success', res.data);
        let updatedNewAdminOrg = adminOrgs.filter(
          (adminOrg) => adminOrg.id !== targetId && !adminOrg.reviewed
        );
        console.log('What is updatedNewadminOrg', updatedNewAdminOrg);
        setNewAdminOrgs(updatedNewAdminOrg);
      })
      .catch((error) => {
        console.log('error changing status');
      });
  }

  return (
    <div className='company-table'>
      <h2>Admin Organization</h2>
      <h3>Current Admin Organization Count: {adminOrgs.length}</h3>

      <div
        className={newAdminOrgs.length ? 'new-company table display-table' : 'new-company-table hide-table'}>
        <h4>New AdminOrgs</h4>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newAdminOrgs.map((adminOrg) => (
                <TableRow key={adminOrg.id}>
                  <TableCell component='th' scope='row'>
                    {adminOrg.orgName}
                  </TableCell>
                  <TableCell align="left">{adminOrg.city}</TableCell>
                  <TableCell align="left">{adminOrg.state}</TableCell>
                  <TableCell align="left">{adminOrg.zipcode}</TableCell>
                  <TableCell align="left">{adminOrg.id}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<ThumbUpIcon />}
                      onClick={() => handleApproveClick(adminOrg)}>
                      Approve
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      startIcon={<MergeTypeIcon />}>
                      Merge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className='all-adminOrg-table'>
        <h4>All AdminOrgs</h4>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Organization Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrgs.map((adminOrg) => (
                <TableRow key={adminOrg.id}>
                  <TableCell component='th' scope='row'>
                    {adminOrg.orgName}
                  </TableCell>
                  <TableCell align="left">{adminOrg.city}</TableCell>
                  <TableCell align="left">{adminOrg.state}</TableCell>
                  <TableCell align="left">{adminOrg.zipcode}</TableCell>
                  <TableCell align='left>'>TBA</TableCell>
                  <TableCell align="left">TBA</TableCell>
                  <TableCell align="left">See Description</TableCell>

                  <TableCell align="left">{adminOrg.id}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<EditIcon />}
                      >
                      Edit
                    </Button>

                    <Button
                      variant='outlined'
                      color='secondary'
                      startIcon={<DeleteIcon />}
                      >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminOrg;
