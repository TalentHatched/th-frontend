import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";

import User from "../superuser/user";
import AdminOrg from "../superuser/adminOrg";
import Industry from "../superuser/industry";
import Company from "../superuser/company";
import Skill from "../superuser/skill";
import Job from "../superuser/job";
import ParentContact from "../superuser/parentContact";


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
        <Tab label='All User'></Tab>
        <Tab label='Admin Org'></Tab>
        <Tab label='Parent Contact'></Tab>
      </Tabs>
      {/* {currentTab === 'user' && <h1>Show this</h1>} */}
      {value === 0 && <User />}
      {value === 1 && <AdminOrg />}
      {value === 2 && <ParentContact />}
    </div>
  );
};

export default SuperUserDashboard;
