import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const switchState = (newState) => {
    setCurrState(newState);
    setFormData({
      name: '',
      email: '',
      password: '',
      agree: false,
    });
  };
  return (
    <div className='login'>
      <form className='login-container' onSubmit={handleSubmit}>
        <div className='login-title'>
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.crossIcon} alt='cross icon' id='cross-icon'/>
        </div>
        <div className='login-inputs'>
          {currState === 'Sign Up' && (
            <input
              type='text'
              name='name'
              placeholder='Your name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='Your email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-pop-condition'>
          <input
            type='checkbox'
            name='agree'
            checked={formData.agree}
            onChange={handleInputChange}
            required
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div><br/>
        {currState === 'Login' ? (
          <p>Create a new account? <span id='new-acc' onClick={() => switchState('Sign Up')}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span id='exist-acc' onClick={() => switchState('Login')}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
