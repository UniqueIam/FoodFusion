import React, { useContext, useState,useRef,useEffect } from 'react';
import './Navbar.css';
import { FaBasketShopping } from "react-icons/fa6";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

function Navbar({ setShowLogin, menuRef }) {
  const [menu, setMenu] = useState("home-underline");
  const { token, setToken, getTotalCartAmount } = useContext(StoreContext);

  const navHead = useRef();
  const navMenu = useRef();
  const navMenuList = useRef([]);

  useGSAP(() => {
    var t1 = gsap.timeline();
    t1.from(".nav-part",{
      y:-50,
      duration:1,
      opacity:0
    })
    t1.from(navHead.current, {
      y: -30,
      opacity: 0,
      duration: 0.5,
    });

    t1.from(navMenuList.current, {
      y: -30,
      opacity: 0,
      stagger: 0.2,
    });
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleHomeClick = () => {
    setMenu("home-underline");
    navigate('/');
  };

  const handleMenuClick = () => {
    setMenu("menu-underline");
    navigate('/', { state: { scrollToMenu: true } });
  };

  return (
    <div className='nav-part'>
      <Link to='/'><h2 ref={navHead} id='food'>FoodFusion</h2></Link>
      <div className='navbar-center'>
        <ul ref={navMenu} className='navbar-menu'>
        <li ref={(el) => navMenuList.current[0] = el} onClick={handleHomeClick} className={menu === "home-underline" ? "active" : ""}>Home</li>
          <li ref={(el) => navMenuList.current[1] = el} onClick={handleMenuClick} className={menu === "menu-underline" ? "active" : ""}>Menu</li>
          <li ref={(el) => navMenuList.current[2] = el} onClick={() => setMenu("contact-underline")} className={menu === "contact-underline" ? "active" : ""}>Contact</li>
          <li ref={(el) => navMenuList.current[3] = el} onClick={() => setMenu("about-underline")} className={menu === "about-underline" ? "active" : ""}>About</li>
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
      </div>
    </div>
  );
}

export default Navbar;
