import React, {useState} from 'react';
import "./ResetPassword.css"
import Template from "../components/Template.jsx"
import emailIcon from "../assets/email.png";

const ResetPassword =  () => {
    const [email, setEmail] = useState('');

    return(
        <div className="reset-password">
            <Template title="Reset Password" button_text="Send Code" navigateTo="/verify-code">
                <p>Enter your email below to receive your code</p>
                <div className='input_grp'>
                  <label htmlFor="E-mail">E-mail address</label>
                  <img src={emailIcon} alt="e-mail icon" className='left-icon' />
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
            </Template>
        </div>
    );
};

export default ResetPassword;