import React from 'react'
import './Footer.css'
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>
        <h2 id='footer-heading'>Food</h2>
         <p>loremdjjdbfiewdnlkfn</p>
         <div className='social-media-icons'>
        <RiFacebookCircleLine id='face-icon' />
        <FaTwitterSquare id='twit-icon' />
        <FaLinkedin id='link-icon'/>
        </div>
      </div> 
      <div className='footer-middle'>
      <h2 className='footer-middle-heading'>Company</h2>
      <ul className='footer-middle-list'>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
      </ul>
      </div>
      <div className='footer-right'>
       <h2 className='footer-right-heading'>Get in touch</h2>
       <p>+1012345678</p>
       <p>unique@gmail.com</p>
      </div>
      
    </div>
  )
}

export default Footer
