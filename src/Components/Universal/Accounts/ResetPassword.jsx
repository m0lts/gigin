import { Link, useNavigate } from "react-router-dom"
import { SubmitButton } from "../Features/Buttons"
import { useState } from "react"
import './accounts.css'

export default function ResetPassword() {

    const navigate = useNavigate();


    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tokenError, setTokenError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [formValues, setFormValues] = useState({
        password: '',
        verify_password: '',
        token: '',
    })

    // Disable submit button if true
    const requiredFieldsFilled = formValues.password && formValues.verify_password && formValues.token && !passwordError && !verifyPasswordError;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
            });
        
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords do not match');
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (passwordError || verifyPasswordError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }

        try {
            const response = await fetch('/api/Accounts/ResetPassword.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
            });
      
            // Handle the response from the backend
            if (response.ok) {
              // Password reset was successful
                setFormSubmitted(false);
                navigate('/login');
            } else {
                setFormSubmitted(false);
                setTokenError('* Unique code invalid.')
            }
          } catch (error) {
            console.error('An error occurred during password reset:', error);
          }


    }



    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/">
                    <img src="/src/Assets/Interface/Logos/gigin-logo.PNG" alt="Gigin Logo" className="gateway_page_logo" />
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Reset Password</h1>
                {formSubmitted ? (
                    <div className="submission_processing">
                    <div className="loader"></div>
                    </div>
                ) : (
                    <form action="" className="gateway_page_form" onSubmit={handleSubmit}>
                        <div className="gateway_page_token_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input 
                        type="text" 
                        id="token" 
                        name="token" 
                        placeholder="Unique Code" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.token}
                        onChange={handleInputChange}
                        />
                        {tokenError && <div className="error_message">{tokenError}</div>}
                        </div>
                    <div className="gateway_page_password_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.password}
                        onChange={handleInputChange}
                        />
                        {passwordError && <div className="error_message">{passwordError}</div>}
                    </div>
                    <div className="gateway_page_verify_password_input">
                        {/* <label htmlFor="verify_password">Repeat Password</label> */}
                        <input 
                        type="password" 
                        id="verify_password" 
                        name="verify_password" 
                        placeholder="Repeat Password" 
                        required={true}
                        className="gateway_page_form_input" 
                        onChange={handleInputChange}
                        />
                        {verifyPasswordError && <div className="error_message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton disabled={!requiredFieldsFilled} />
                    </form>
                )}
            </main>
        </section>
    )
}