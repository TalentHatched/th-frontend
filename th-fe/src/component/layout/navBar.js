import React from 'react';
import './navBar.css';

const navBar = (props) => {
  return (
    <div className='navBar'>
      <nav>
        <a href="/">
          <img
            src='th-logo.jpg'
            className='th-logo'
            alt='Talent Hatched Logo'></img>
        </a>
      </nav>
    </div>
  );
};

export default navBar;
