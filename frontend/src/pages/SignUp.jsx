import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css";
import Template from "../components/Template.jsx";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";

const API_BASE_URL = "http://localhost:8000";

const SignUp = () => {

   const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const EyeClosed = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    //used auth.py
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: email,
        password: password,
        fullname: email.split('@')[0] 
      });

      if (response.status === 201) {
        //in the back we need to navigate to signin before chat that's the only solution i found 
        setSuccess("Account created! Please check your email to verify your account before logging in.");
        setTimeout(() => navigate("/signin"), 5000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.det || err.response?.data?.detail || "Registration failed.";
      setError(errorMsg);
    }
  };

  return (
    <div className="sign-up">
      <Template title="Sign Up" button_text="Sign Up" onButtonClick={handleRegister}>
        {error && <p className="error-msg" >{error}</p>}
        {success && <p className="success-msg" >{success}</p>}
        {success && ( <button className="resend-btn" onClick={async () => {
          try {
          await axios.post(`${API_BASE_URL}/auth/resend-verification`, { email: email });
          alert("Verification email sent again.");
          } catch (err) {
          alert( err.response?.data?.detail || "Failed to resend verification email.");
          }
         }}> Resend verification emai </button>
        )}

        <div className='input_grp'>
          <label htmlFor="E-mail">E-mail address</label>
          <div className="input-wrapper">
            <img src={emailIcon} alt="e-mail icon" className='left-icon-signup' />
            <input
              type="email"
              id="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your e-mail"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className='input_grp'>
          <label htmlFor="Password">Password</label>
          <div className="input-wrapper">
            <img src={passwordIcon} alt="password icon" className='left-icon-signup' />
            <input
              type={showPassword ? 'text' : 'password'}
              id="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeClosed /> : <EyeOpen />}
            </button>
          </div>
        </div>

        <div className='input_grp'>
          <label htmlFor="ConfirmPassword">Confirm password</label>
          <div className="input-wrapper">
            <img src={passwordIcon} alt="password icon" className='left-icon-signup'/>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="ConfirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirmPassword(v => !v)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeClosed /> : <EyeOpen />}
            </button>
          </div>
        </div>
        <p>Already have an account?{" "}
          <Link to="/signin" className="SignIn">Sign In</Link>
        </p>
      </Template>
    </div>
  );
};

export default SignUp;