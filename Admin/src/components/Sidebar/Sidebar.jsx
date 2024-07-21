// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdFeaturedPlayList } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option' activeClassName='active'>
          <IoMdAddCircleOutline id='add-icon' />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option' activeClassName='active'>
          <MdFeaturedPlayList id='list-icon' />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className='sidebar-option' activeClassName='active'>
          <MdFeaturedPlayList id='order-icon' />
          <p>Order Items</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;

