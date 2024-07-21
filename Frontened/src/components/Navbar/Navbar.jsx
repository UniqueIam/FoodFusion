import React, { useState } from 'react';
import './Navbar.css';
import { FaBasketShopping } from "react-icons/fa6";


function Navbar() {

  const [menu ,setMenu] = useState("home-underline");

  return (
    <div className='nav-part'>
      {/* <img src={assets.food_logo} alt='food logo' /> */}
          <h2 id='food'>Food</h2>
          <div className='navbar-center'>
      <ul className='navbar-menu'>
        <li onClick={()=>setMenu("home-underline")} className={menu ==="home-underline"?"active":""}>Home</li>
        <li onClick={()=>setMenu("menu-underline")} className={menu ==="menu-underline"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("contact-underline")} className={menu ==="contact-underline"?"active":""}>Contact</li>
        <li onClick={()=>setMenu("about-underline")} className={menu ==="about-underline"?"active":""}>About</li>
      </ul>
      </div>
      <div className='navbar-right'>
      <div className='singup-area'>
          <button id='signup'>Signup</button>
      </div>
      <div className='basket'>
        <FaBasketShopping id='basket-dimension' />
        <div className='dot'></div>
      </div>
      <div className='search-bar'>
          <input 
            id='search-here'
            type='text'
            placeholder='search here'
          />
      </div>
          
      </div>
    </div>
  );
}

export default Navbar;
