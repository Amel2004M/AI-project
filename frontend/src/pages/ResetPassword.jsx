import React, {useState} from 'react';
import "./ResetPassword.css"
import Template from "../components/Template.jsx"

const ResetPassword =  () => {

    return(
        <div>
            <Template title="Reset Password" button_text="Send Code" navigateTo="/verify-code">
                <p>Enter your email below to receive your code</p>
                <div className='input_grp'>
                  <label htmlFor="E-mail">E-mail adress</label>
                  <input type="email" id="E-mail" placeholder="Enter your e-mail" />
                </div>
            </Template>
        </div>
    );
};

export default ResetPassword;