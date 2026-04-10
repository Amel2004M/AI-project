import React, {useState} from 'react';
import "./SignIn.css"
import Template from "./component/Template.jsx"

const SignIn =  () => {

    return(
        <div>
            <Template title="Sign In" button_text="Sign In">
                <div className='input_grp'>
                  <label htmlFor="E-mail">E-mail adress</label>
                  <input type="email" id="E-mail" placeholder="Enter your e-mail" />
                </div>
                <div className='input_grp'>
                  <label htmlFor="Password">Password</label>
                  <input type="password" id="Password" placeholder="Enter your password" />
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>
                
                  <p> Don’t have an account yet?{" "}
                    <Link to="/SignUp" className="SignUp">Sign Up</Link>
                  </p>
            </Template>
        </div>

    );
};

export default SignIn;