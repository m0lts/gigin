import { Link } from "react-router-dom"
import { SubmitButton } from "../../minor_components/buttons"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

    const navigate = useNavigate();

    // Retrieve token from URL
    const { token } = useParams();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [formValues, setFormValues] = useState({
        password: '',
        verify_password: '',
        token: token,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords do not match');
        }

        // Update formValues for password and verify_password only
        if (name === 'password' || name === 'verify_password') {
            setFormValues({
            ...formValues,
            [name]: value,
            });
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
            const response = await fetch('/api/resetPasswordSystem', {
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
              console.error('Password reset failed:', response.statusText);
            }
          } catch (error) {
            console.error('An error occurred during password reset:', error);
          }


    }



    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/">
                    <img src="/src/assets/images/logos/gigin-logo.PNG" alt="Gigin Logo" className="gateway_page_logo" />
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
                        {passwordError && <div className="error-message">{passwordError}</div>}
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
                        {verifyPasswordError && <div className="error-message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton />
                    </form>
                )}
            </main>
        </section>
    )
}