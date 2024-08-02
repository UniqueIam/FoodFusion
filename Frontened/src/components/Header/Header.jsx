import React,{ useRef } from 'react'
import './Header.css'
import {gsap} from "gsap";
import { useEffect } from 'react';

function Header() {
  const boxRef = useRef(null);

  useEffect(()=>{
    gsap.from(boxRef.current,{
      opacity:0,
      duration:1,
      delay:1,
      scale:0.2
    })
  },[])
  return (
    <div className='header-part'>
      <div className='header-content'>
      <h2 ref={boxRef}>Place Your Order Here</h2>
      <p>Welcome to Food Adda, where every meal is an experience and every bite tells a story. Discover our diverse menu, crafted with fresh ingredients and love, to satisfy your cravings and inspire your taste buds. Join us for a culinary journey like no other, and let your senses savor the magic of great food.</p>
      <button id='header-view-menu'>View Menu</button>
      </div>
    </div>
  )
}

export default Header
