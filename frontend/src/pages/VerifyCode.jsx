import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./VerifyCode.css"
import Template from "../components/Template.jsx"

const VerifyCode =  () => {
const [code, setCode] = useState('');

    return(
        <div className="verify-code">
            <Template title="Verify Code" button_text="Verify" navigateTo="/resetting-password">
                <p>Please enter the code we just sent to your email</p>
                <div className='input_grp'>
                  <input type="number" id="number1" placeholder="-" required/>
                  <input type="number" id="number2" placeholder="-" required/>
                  <input type="number" id="number3" placeholder="-" required/>
                  <input type="number" id="number4" placeholder="-" required/>
                  <input type="number" id="number5" placeholder="-" required/>
                </div>
                
                  <p> Didn't receive any email?{" "}
                    <Link to="/ResetPassword" className="ResendCode">Resend Code</Link>
                  </p>
            </Template>
        </div>

    );
};

export default VerifyCode;