import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import ApplicantRegistrationForm from '../auth/applicantRegistration';

const AdminDashboard = () => {
  const [showAddApplicantButton, setShowAddApplicantButton] = useState(true);

  const handleAddApplicantClick = (event) => {
    setShowAddApplicantButton(false)
  }


  return (
    <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>
      <div>
        {showAddApplicantButton ? (
          <Button variant='contained' color='primrary' onClick={handleAddApplicantClick}>
            Add Applicant
          </Button>
        ) : (
          ''
        )}
      </div>
      <div>
        {!showAddApplicantButton? <ApplicantRegistrationForm /> : ''}
      </div>
    </div>
  );
};

export default AdminDashboard;
