import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import ApplicantRegistrationForm from '../auth/applicantRegistration';
import axios from 'axios';

const AdminDashboard = () => {
  const [showAddApplicantButton, setShowAddApplicantButton] = useState(true);
  const [applicantRegistrationWarning, setApplicantRegistrationWarning] =
    useState('');

  const handleAddApplicantClick = (event) => {
    setShowAddApplicantButton(false);
  };

  const handleReturnClick = (event) => {
    setShowAddApplicantButton(true);
  };

  const handleAddStudentSubmission = (info) => {
    setApplicantRegistrationWarning('')
    console.log('What is info', info);
    axios
      .post('http://localhost:8081/api/user/studentRegister', info)
      .then((res) => {
        setShowAddApplicantButton(true);
      })
      .catch((error) => {
        console.log('what is error', error);
        setApplicantRegistrationWarning(
          'Unable to add new applicant. Please try again later.'
        );
      });
  };

  return (
    <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>
      <div>
        {showAddApplicantButton ? (
          <Button
            variant='contained'
            color='primrary'
            onClick={handleAddApplicantClick}>
            Add Applicant
          </Button>
        ) : (
          ''
        )}
      </div>
      <div>
        {!showAddApplicantButton ? (
          <ApplicantRegistrationForm
            handleReturnClick={handleReturnClick}
            isAdmin={true}
            handleAddStudentSubmission={handleAddStudentSubmission}
            applicantRegistrationWarning={applicantRegistrationWarning}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
