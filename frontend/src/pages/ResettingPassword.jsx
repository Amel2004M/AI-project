import React, {useState} from 'react';
import "./ResettingPassword.css"
import Template from "../components/Template.jsx"
import passwordIcon from "../assets/password.png";

const ResettingPassword =  () => {

    return(
        <div className="resetting-password">
            <Template title="Reset Password" button_text="Change Password" navigateTo="/signin">
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
                  <img src={passwordIcon} alt="password icon" className='left-icon' />
                  <input type="password" id="Password" placeholder="Enter your password" />
                </div>
                <div className='input_grp'>
                  <label htmlFor="ConfirmPassword">Confirm Password</label>
                  <input type="password" id="ConfirmPassword" placeholder="Confirm your password" />
                </div>
            </Template>
        </div>

    );
};

export default ResettingPassword;