import React, {useState} from 'react';
import "./ResettingPassword.css"
import Template from "../components/Template.jsx"
import passwordIcon from "../assets/password.png";

const ResettingPassword =  () => {
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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


    return(
        <div className="resetting-password">
            <Template title="Reset Password" button_text="Change Password" navigateTo="/signin">
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
                  <div className='input-wrapper'>
                    <img src={passwordIcon} alt="password icon" className='left-icon' />
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
                        <img src={passwordIcon} alt="password icon" className='left-icon'/>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="ConfirmPassword"
                            placeholder="Confirm your password"
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
            </Template>
        </div>

    );
};

export default ResettingPassword;