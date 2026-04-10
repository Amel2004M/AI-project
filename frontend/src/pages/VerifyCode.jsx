import React, {useState} from 'react';
import "./VerifyCode.css"
import Template from "./component/Template.jsx"

const VerifyCode =  () => {

    return(
        <div>
            <Template title="Verify Code" button_text="Verify">
                <p>Please enter the code we just sent to your email</p>
                <div className='input_grp'>
                  <input type="number" id="number1" placeholder="-" />
                  <input type="number" id="number2" placeholder="-" />
                  <input type="number" id="number3" placeholder="-" />
                  <input type="number" id="number4" placeholder="-" />
                  <input type="number" id="number5" placeholder="-" />
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>
                
                  <p> Didn't receive any email?{" "}
                    <Link to="/ResetPassword" className="ResendCode">Resend Code</Link>
                  </p>
            </Template>
        </div>

    );
};

export default VerifyCode;