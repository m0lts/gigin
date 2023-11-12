import { useState } from "react";

export default function SignUpPasswordSection({ signUpData, setSignUpData }) {

    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setSignUpData({
          ...signUpData,
          [name]: value,
        });

        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verifyPassword' || name === 'password') {
            setVerifyPasswordError(value === signUpData.password ? '' : '* Passwords must match');
        }
    };

    return (
        <>
            <div className="gateway_page_password_input">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                required={true}
                onChange={handleInputChange}
                />
                {passwordError && <p className="error_message">{passwordError}</p>}
            </div>
            <div className="gateway_page_verify_password_input">
                <label htmlFor="verifyPassword">Repeat Password</label>
                <input 
                type="password" 
                id="verifyPassword" 
                name="verifyPassword" 
                required={true}
                onChange={handleInputChange}
                />
                {verifyPasswordError && <p className="error_message">{verifyPasswordError}</p>}
            </div>

        </>
    )
}