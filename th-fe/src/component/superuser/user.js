import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../util/axiosWithAuth';
import "./user.css"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('api/user')
      .then((res) => {
        console.log('res.data', res.data);
        setUsers(res.data.user);
      })
      .catch((err) => {
        console.log('what is the err', err.response);
      });
  }, []);

  

  return (
    <div className='user-table'>
      <h2>User Info</h2>
      <h3>Current User Count: {users.length}</h3>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Active Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userName}>
                <TableCell component='th' scope='row'>
                  {user.userName}
                </TableCell>
                <TableCell align='left'>{user.userFullName}</TableCell>
                <TableCell align='left'>{user.userEmail}</TableCell>
                <TableCell align='left'>
                  {user.registrationDate}
                </TableCell>
                <TableCell align='left'>{user.userTypeId}</TableCell>
                <TableCell align='left'>
                  {user.isActive ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
