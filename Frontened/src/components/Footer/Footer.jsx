import React from 'react';
import './Footer.css';
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = React.forwardRef((props, ref) => {  // Use React.forwardRef to attach the ref
  const navigate = useNavigate();

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <div ref={ref} className='footer'>  {/* Attach the ref here */}
      <div className='footer-left'>
        <h2 id='footer-heading'>Food</h2>
         <p>loremdjjdbfiewdnlkfn</p>
         <div className='social-media-icons'>
        <RiFacebookCircleLine id='face-icon' />
        <FaTwitterSquare id='twit-icon' />
          <a href="https://www.linkedin.com/in/abhimanyukumar132004/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin id='link-icon'/>
          </a>
        </div>
      </div> 
      <div className='footer-middle'>
        <h2 className='footer-middle-heading'>Company</h2>
        <ul className='footer-middle-list'>
          <li onClick={() => scrollToTopAndNavigate("/")}>Home</li>
          <li>About us</li>
          <li onClick={()=>navigate("/myorders")}>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className='footer-right'>
       <h2 className='footer-right-heading'>Get in touch</h2>
       <p>+1012345678</p>
       <p>unique@gmail.com</p>
      </div>
    </div>
  );
});

export default Footer;
