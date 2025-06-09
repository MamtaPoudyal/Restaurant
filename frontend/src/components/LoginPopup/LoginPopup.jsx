import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    let endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';

    try {
      const response = await axios.post(`${url}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Full API Response:", response); // Debugging log

      if (response.data?.success && response.data?.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        console.log("Token Stored Successfully:", localStorage.getItem('token'));
        setShowLogin(false);
      } else {
        setErrorMessage(response.data?.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Login/Register Error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <button
            type="button"
            className="close-button"
            onClick={() => setShowLogin(false)}
            aria-label="Close"
          >
            <img src={assets.cross_icon} alt='close' />
          </button>
        </div>

        <div className='login-pop-up-inputs'>
          {currState === 'Sign Up' && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password (min 6 chars)'
            required
            minLength={6}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {currState === 'Sign Up' && (
          <div className='login-popup-condition'>
            <input type='checkbox' required />
            <p>By continuing, I agree to the terms of use & Privacy Policy.</p>
          </div>
        )}

        <button type='submit' disabled={loading}>
          {loading ? 'Please wait...' : currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <p>
          {currState === 'Login' ? (
            <>
              Create a New Account?{' '}
              <span onClick={() => setCurrState('Sign Up')}>Click here</span>
            </>
          ) : (
            <>
              Already have an Account?{' '}
              <span onClick={() => setCurrState('Login')}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
