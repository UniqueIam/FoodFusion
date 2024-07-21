import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="navbar">
    <div className='navbar-left-admin-panel'>
      <h2 id='food'>Food</h2>
      <h3>Admin Panel</h3>
      </div>
      <img src={assets.profile} alt="profile logo" />
    </div>
  );
};

export default Navbar;
