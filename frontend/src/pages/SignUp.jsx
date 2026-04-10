import React, {useState} from 'react';
import "./SignUp.css"
import Template from "./component/Template.jsx"

const SignUp =  () => {

    return(
        <div>
            <Template title="Sign Up" button_text="Sign Up">
                <div className='input_grp'>
                  <label htmlFor="E-mail">E-mail adress</label>
                  <input type="email" id="E-mail" placeholder="Enter your e-mail" />
                </div>
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
                  <input type="password" id="Password" placeholder="Enter your password" />
                </div>
                <div className='input_grp'>
                  <label htmlFor="ConfirmPassword">Confirm password</label>
                  <input type="password" id="ConfirmPassword" placeholder="Confirm your password" />
                </div>
                
                  <p> Already have an account?{" "}
                    <Link to="/" className="SignIn">Sign In</Link>
                  </p>
            </Template>
        </div>

    );
};

export default SignUp;