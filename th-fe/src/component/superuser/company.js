import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './company.css';

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

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompanies, setNewCompanies] = useState([]);
  useEffect(() => {
    axios
      .get('api/company')
      .then((res) => {
        setCompanies(res.data.data);
        setNewCompanies(getNewCompanies(res.data.data));
      })

      .catch((err) => {
        console.log('what is the err fetching companies', err.response);
      });
  }, [companies]);

  function getNewCompanies(data) {
    return data.filter((data) => !data.reviewed);
  }

  function handleApproveClick(company) {
    let targetId = company.id;
    let data = { reviewed: true };
    axios
      .put(`api/company/${targetId}`, data)
      .then((res) => {
        let updatedNewCompany = companies.filter(
          (company) => company.id !== targetId && !company.reviewed
        );
        setNewCompanies(updatedNewCompany);
      })
      .catch((error) => {
        console.log('error changing status');
      });
  }

  return (
    <div className='company-table'>
      <h2>Company</h2>
      <h3>Current Company Count: {companies.length}</h3>

      <div
        className={newCompanies.length ? 'new-company-table display-table' : 'new-company-table hide-table'}>
        <h4>New Companies</h4>

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
              {newCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell component='th' scope='row'>
                    {company.companyName}
                  </TableCell>
                  <TableCell align='left'>{company.city}</TableCell>
                  <TableCell align='left'>{company.state}</TableCell>
                  <TableCell align='left'>{company.zipcode}</TableCell>
                  <TableCell align='left'>{company.id}</TableCell>
                  <TableCell align='left'>
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<ThumbUpIcon />}
                      onClick={() => handleApproveClick(company)}>
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

      <div className='all-company-table'>
        <h4>All Companies</h4>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
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
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell component='th' scope='row'>
                    {company.companyName}
                  </TableCell>
                  <TableCell align='left'>{company.city}</TableCell>
                  <TableCell align='left'>{company.state}</TableCell>
                  <TableCell align='left'>{company.zipcode}</TableCell>
                  <TableCell align='left>'>TBA</TableCell>
                  <TableCell align='left'>TBA</TableCell>
                  <TableCell align='left'>See Description</TableCell>

                  <TableCell align='left'>{company.id}</TableCell>
                  <TableCell align='left'>
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<EditIcon />}
                      Edit>
                      Edit
                    </Button>

                    <Button
                      variant='outlined'
                      color='secondary'
                      startIcon={<DeleteIcon />}
                      Delete>
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

export default Company;
