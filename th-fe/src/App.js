import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './component/layout/navBar';
import AdminLogin from './component/auth/adminLogin';
import ApplicantLogin from './component/auth/applicantLogin';
import CompanyLogin from './component/auth/companyLogin';
import SuperUserLogin from './component/auth/superUserLogin';

import ApplicantDashboard from './component/applicant/applicantDashboard';
import CompanyDashboard from './component/dashboard/companyDashboard';
import AdminDashboard from './component/admin/adminDashboard';
import SuperUserDashboard from './component/dashboard/superuserDashboard';

import CompanyRegistration from './component/auth/companyRegistration';
import AdminRegistration from './component/auth/adminRegistration';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route path='/adminlogin' component={AdminLogin}></Route>
            <Route path='/applicantlogin' component={ApplicantLogin}></Route>
            <Route path='/superuserlogin' component={SuperUserLogin}></Route>
            <Route path='/companylogin' component={CompanyLogin}></Route>
            <Route path='/adminregister' component={AdminRegistration}></Route>
            <Route
              path='/companyregister'
              component={CompanyRegistration}></Route>
            <Route exact path='/dashboard1' component={ApplicantDashboard} />
            <Route
              exact
              path='/dashboard2'
              component={CompanyDashboard}></Route>
            <Route exact path='/dashboard3' component={AdminDashboard} />
            <Route exact path='/dashboard4' component={SuperUserDashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
