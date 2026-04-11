import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./VerifyCode.css"
import Template from "../components/Template.jsx"

const VerifyCode = () => {
    const [code, setCode] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;
        
        // Update the code array
        const newCode = [...code];
        newCode[index] = value.slice(0, 1); // Only take first character
        setCode(newCode);
        
        // Auto-focus next input
        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return(
        <div className="verify-code">
            <Template title="Verify Code" button_text="Verify" navigateTo="/resetting-password">
                <p>Please enter the code we just sent to your email</p>
                <div className='input_grp'>
                    <div className="code-inputs">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <input
                                key={i}
                                type="text"
                                id={`number${i+1}`}
                                value={code[i]}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                placeholder="-"
                                required
                                maxLength="1"
                                ref={(el) => inputRefs.current[i] = el}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="resend-container">
                    <p className='text'> Didn't receive any email?{" "}
                    <Link to="/ResetPassword" className="ResendCode">Resend Code</Link>
                  </p>
                </div>
            </Template>
        </div>
    );
};

export default VerifyCode;