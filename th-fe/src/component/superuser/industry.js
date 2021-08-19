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
} from '@material-ui/core';

const Industry = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/industry')
      .then((res) => {
        console.log('What is data here', res.data.data);
        setIndustries(res.data.data);
      })

      .catch((err) => {
        console.log('what is the err, ', err.response);
      });
  });

  return (
    <div>
      <h2>Industry</h2>
      <h3>Current Industry Count: {industries.length}</h3>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Industry</TableCell>
              <TableCell>Industry ID</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Industry;
