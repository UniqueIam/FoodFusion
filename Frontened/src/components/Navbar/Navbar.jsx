import React, { useContext, useState, useRef } from 'react';
import './Navbar.css';
import { FaBasketShopping } from "react-icons/fa6";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger menu icons

function Navbar({ setShowLogin, menuRef, footerRef }) {
  const [menu, setMenu] = useState("home-underline");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For toggling mobile menu
  const { token, setToken, getTotalCartAmount } = useContext(StoreContext);
  const navHead = useRef();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleHomeClick = () => {
    setMenu("home-underline");
    navigate('/');
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  const handleMenuClick = () => {
    setMenu("menu-underline");
    navigate('/', { state: { scrollToMenu: true } });
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setMenu("contact-underline");
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='nav-part'>
      <Link to='/'><h2 ref={navHead} id='food'>FoodFusion</h2></Link>

      <div className={`navbar-center ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className='navbar-menu'>
          <li onClick={handleHomeClick} className={menu === "home-underline" ? "active" : ""}>Home</li>
          <li onClick={handleMenuClick} className={menu === "menu-underline" ? "active" : ""}>Menu</li>
          <li onClick={handleContactClick} className={menu === "contact-underline" ? "active" : ""}>Contact</li>
        </ul>
      </div>

      <div className='navbar-right'>
        <div className='signup-area'>
          {!token
            ? <button id='signup' onClick={() => setShowLogin(true)}>Signup</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt='' style={{ height: "35px", width: "35px" }} />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.order} alt='' /><p>Orders</p>
                </li><hr />
                <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p> </li>
              </ul>
            </div>
          }
        </div>
        <div className='basket'>
          <Link to='/cart'><FaBasketShopping id='basket-dimension' /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        <div className='hamburger' onClick={handleMenuToggle}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='mobile-menu'>
          <ul className='mobile-navbar-menu'>
            <li onClick={handleHomeClick}>Home</li>
            <li onClick={handleMenuClick}>Menu</li>
            <li onClick={handleContactClick}>Contact</li>
            {token ? (
              <>
                <li onClick={() => navigate('/myorders')}>Orders</li>
                <li onClick={logout}>Logout</li>
              </>
            ) : (
              <li onClick={() => setShowLogin(true)}>Signup</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
