import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopUp.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  });

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setData((data) => ({ ...data, [name]: type === 'checkbox' ? checked : value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error.response ? error.response.data : error.message);
      alert(error.response && error.response.data ? error.response.data.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='loginPopup'>
      <form onSubmit={onLogin} className='login-container'>
        <div className='login-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.crossIcon} alt='' />
        </div>
        <div className='login-inputs'>
          {currState === 'Sign Up' && (
            <input
              type='text'
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              placeholder='Your name'
              required
            />
          )}
          <input
            type='email'
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            placeholder='your email'
            required
          />
          <input
            type='password'
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            placeholder='password'
            required
          />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {currState === 'Sign Up' && (
          <div className='login-pop-condition'>
            <input
              type='checkbox'
              name='agree'
              onChange={onChangeHandler}
              checked={data.agree}
              required
            />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        <br />
        {currState === 'Login' ? (
          <p>
            Create an Account <span onClick={() => setCurrState('Sign Up')}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
