import { useState } from "react"

export default function LogInPassword({ logInData, setLogInData }) {

    const [passwordError, setPasswordError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLogInData({
            ...logInData,
            [name]: value,
        });

        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
    }

    return (
        <div>
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            onChange={handleInputChange}
                />
            {passwordError && <p className="error_message">{passwordError}</p>}
        </div>
    )
}