import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './component/layout/navBar';
import AdminLogin from './component/auth/adminLogin';
import ApplicantLogin from './component/auth/applicantLogin';
import CompanyLogin from './component/auth/companyLogin';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route path='/adminlogin' component={AdminLogin}></Route>
            <Route path='/applicantlogin' component={ApplicantLogin}></Route>
            <Route path='/companylogin' component={CompanyLogin}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
