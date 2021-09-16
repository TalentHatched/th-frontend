import React, { useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';

import User from '../superuser/user';
import AdminOrg from '../superuser/adminOrg';
import Industry from '../superuser/industry';
import Company from '../superuser/company';
import Skill from '../superuser/skill';
import Job from '../superuser/job';

const SuperUserDashboard = () => {
  const [value, setValue] = useState(0);
  

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='company-dashboard'>
      <Tabs
        aria-label='simple tab example'
        value={value}
        onChange={handleTabChange}
        centered>
        <Tab label='User'></Tab>
        <Tab label='Admin Org'></Tab>
        <Tab label='Company'></Tab>
        <Tab label='Industry'></Tab>
        <Tab label='Skill'></Tab>
        <Tab label='Job'></Tab>
      </Tabs>
      {/* {currentTab === 'user' && <h1>Show this</h1>} */}
      {value === 0 && <User />}
      {value === 1 && <AdminOrg />}
      {value === 2 && <Company />}
      {value === 3 && <Industry />}
      {value === 4 && <Skill />}
      {value === 5 && <Job />}
    </div>
  );
};

export default SuperUserDashboard;
