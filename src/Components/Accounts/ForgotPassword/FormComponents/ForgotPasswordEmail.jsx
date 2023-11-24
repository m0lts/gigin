import { useState } from "react";

export default function ForgotPasswordEmail({ forgotPasswordData, setForgotPasswordData, setPasswordVisible }) {

    const [nextButtonVisible, setNextButtonVisible] = useState(true);

    const [emailError, setEmailError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForgotPasswordData({
            ...forgotPasswordData,
            [name]: value,
        });

        // Email validation
        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? '' : '* Must be a valid email address');
        }
    }

    const handleNextClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/Accounts/Recovery/ForgotPassword.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(forgotPasswordData),
            });
      
            if (response.ok) {
                setPasswordVisible(true);
                setNextButtonVisible(false);
                setEmailError('');
              } else if (response.status === 400) {
                setEmailError('There are no accounts associated with that email address.')
              }
          } catch (error) {
            console.error('Error submitting form:', error);
          }



    }


    return (
        <>
            <div className="accounts_form_input_cont">
                <label htmlFor="email" className="accounts_form_label">Email Address:</label>
                <input 
                type="text" 
                id="email" 
                name="email" 
                required 
                onChange={handleInputChange}
                className="accounts_form_input"
                    />
                {emailError && <p className="error_message">{emailError}</p>}
            </div>
            {nextButtonVisible && (
                <button className="orange_buttons btn" onClick={handleNextClick}>Next</button>
            )}
        </>
    )
}