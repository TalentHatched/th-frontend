import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";

import User from "../superuser/user";
import AdminOrg from "../superuser/adminOrg";

import ParentContact from "../superuser/parentContact";
import "./superuserDashboard.css"

const SuperUserDashboard = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className='superuser-dashboard'>
      <Tabs
        aria-label='simple tab example'
        value={value}
        onChange={handleTabChange}
        centered>
        <Tab label='All User'></Tab>
        <Tab label='Admin Org'></Tab>
        <Tab label='Parent Contact'></Tab>
      </Tabs>
      {value === 0 && <User />}
      {value === 1 && <AdminOrg />}
      {value === 2 && <ParentContact />}
    </div>
  );
};

export default SuperUserDashboard;
