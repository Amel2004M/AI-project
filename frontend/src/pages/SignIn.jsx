import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./SignIn.css"
import Template from "../components/Template.jsx"

const SignIn =  () => {

    return(
        <div className="sign-in">
            <Template title="Sign In" button_text="Sign In" navigateTo="/signin">
                <div className='input_grp'>
                  <label htmlFor="E-mail">E-mail adress</label>
                  <input type="email" id="E-mail" placeholder="Enter your e-mail" />
                </div>
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
                  <input type="password" id="Password" placeholder="Enter your password" />
                  <Link to="/reset-password" className="forgot-link">Forgot password?</Link>
                </div>
                
                  <p> Don’t have an account yet?{" "}
                    <Link to="/" className="SignUp">Sign Up</Link>
                  </p>
            </Template>
        </div>

    );
};

export default SignIn;