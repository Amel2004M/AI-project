import React, {useState} from 'react';
import "./ResettingPassword.css"
import Template from "./component/Template.jsx"

const ResettingPassword =  () => {

    return(
        <div>
            <Template title="Reset Password" button_text="Change Password" navigateTo="/signin">
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
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