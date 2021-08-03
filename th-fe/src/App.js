import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import AdminLoginForm from './component/form/adminLogin';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Switch>
            <Route path='/adminlogin' component={AdminLoginForm}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
