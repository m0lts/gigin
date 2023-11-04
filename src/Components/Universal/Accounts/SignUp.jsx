import { RedirectToLogin, SubmitButton } from "../Features/Buttons"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import './accounts.css'



export default function SignUpPage() {

    // SET UP NAVIGATE
    const navigate = useNavigate();

    // SET STATES
    // For data packet to be sent to database
    const [formValues, setFormValues] = useState({
        forename: '',
        surname: '',
        userType: '',
        showName: '',
        email: '',
        password: '',
        verify_password: '',
        addressLine1: '',
        addressCity: '',
        addressPostCode: '',
        addressCountry: '',
    });
    // For selected option logic
    const [userType, setUserType] = useState('');
    // For validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [postCodeError, setPostCodeError] = useState('');
    // For submission modal
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Disable submit button code
    const requiredFieldsFilled = formValues.forename && formValues.surname && formValues.userType && formValues.showName && formValues.email && formValues.password && formValues.verify_password && !verifyPasswordError;



    // RADIO BUTTONS LOGIC
    // Handle radio buttons logic
    const handleRadioChange = (event) => {
        const { value } = event.target;
        setUserType(value);
      
        // Update the formValues with the selected option
        setFormValues({
          ...formValues,
          userType: value,
        });
    };
    // Update the formValues whenever userType changes
    useEffect(() => {
        setFormValues({
        ...formValues,
        userType: userType,
        });
    }, [userType]);


    
    // SET FORM VALUES TO ENTERED VALUES
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        // Email validation
        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? '' : '* Please enter a valid email address');
        }
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords must match');
        }
        // Post code validation
        if (name === 'addressPostCode') {
            const ukPostCodePattern = /^[A-Za-z]{1,2}\d{1,2}\s*\d[A-Za-z]{2}$/;
            setPostCodeError(ukPostCodePattern.test(value) ? '' : '* Please enter a valid post code');
        }
    };



    // HANDLE FORM SUBMISSION
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (emailError || passwordError || verifyPasswordError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }
        

            try {
                const response = await fetch('/api/Accounts/UserSignUp.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formValues),
                });
          
                // Handle relative responses and edit modal message.
                if (response.ok) {
                    // Redirect user to login page if sign up successful
                    navigate('/login');
                  } else if (response.status === 400) {
                    // Email already taken
                    setEmailError('* Email already in use.');
                    setFormSubmitted(false);
                  } else {
                    alert('Account creation failed, please try again later.');
                    setFormSubmitted(false);
                  }
              } catch (error) {
                console.error('Error submitting form:', error);
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
                <h1 className="gateway_page_title">Sign Up</h1>
                {formSubmitted ? (
                    <div className="submission_processing">
                        <div className="loader"></div>
                    </div>
                ) : 
                <form action="post" className="gateway_page_form" onSubmit={handleSubmit}>
                    <div className="gateway_page_forename_input">
                        {/* <label htmlFor="forename">First Name</label> */}
                        <input 
                            type="text" 
                            id="forename" 
                            name="forename" 
                            placeholder="First Name" 
                            required={true}
                            className="gateway_page_form_input"
                            value={formValues.forename}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div className="gateway_page_surname_input">
                        {/* <label htmlFor="surname">Second Name</label> */}
                        <input 
                            type="text" 
                            id="surname" 
                            name="surname" 
                            placeholder="Second Name" 
                            required={true}
                            className="gateway_page_form_input"
                            value={formValues.surname}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div className="signup_page_radio_input">
                        <p className="signup_page_radio_question">Musician or Venue?</p>
                        <div>
                            <div>
                                <input 
                                type="radio" 
                                id="musician" 
                                name="radio_select" 
                                value="musician" 
                                required={true}
                                className="signup_page_form_radio"
                                checked={userType === 'musician'} 
                                onChange={handleRadioChange} 
                                />
                                <label htmlFor="musician" className="signup_page_form_radio">Musician</label>
                            </div>
                            <div>
                                <input 
                                type="radio" 
                                id="venue" 
                                name="radio_select" 
                                value="venue" 
                                required={true}
                                className="signup_page_form_radio" 
                                checked={userType === 'venue'} 
                                onChange={handleRadioChange} 
                                />
                                <label htmlFor="venue" className="signup_page_form_radio">Venue</label>
                            </div>
                        </div>
                    </div>
                    <div className="gateway_page_name_input">
                        <div className={userType === 'musician' ? 'gateway_page_musician_name_input' : 'hidden'}>
                            {/* <label htmlFor="musician_name">Musician Name</label> */}
                            <input 
                            type="text" 
                            id="showName" 
                            name="showName" 
                            placeholder="Musician/Band Name" 
                            required={userType === 'musician'}
                            className="gateway_page_form_input" 
                            value={formValues.showName}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className={userType === 'venue' ? 'gateway_page_venue_name_input' : 'hidden'}>
                            <div>
                                {/* <label htmlFor="venue_name">Venue Name</label> */}
                                <input 
                                type="text" 
                                id="showName" 
                                name="showName" 
                                placeholder="Venue Name" 
                                required={userType === 'venue'}
                                className="gateway_page_form_input" 
                                value={formValues.showName}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="addressLine1">Address Line 1</label> */}
                                <input 
                                type="text" 
                                id="addressLine1" 
                                name="addressLine1" 
                                placeholder="Address Line 1" 
                                required={userType === 'venue'}
                                className="gateway_page_form_input" 
                                value={formValues.addressLine1}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="addressCity">City</label> */}
                                <input 
                                type="text" 
                                id="addressCity" 
                                name="addressCity" 
                                placeholder="City" 
                                required={userType === 'venue'}
                                className="gateway_page_form_input" 
                                value={formValues.addressCity}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="addressPostCode">Post Code</label> */}
                                <input 
                                type="text" 
                                id="addressPostCode" 
                                name="addressPostCode" 
                                placeholder="Post Code" 
                                required={userType === 'venue'}
                                className="gateway_page_form_input" 
                                value={formValues.addressPostCode}
                                onChange={handleInputChange}
                                />
                                {postCodeError && <div className="error_message">{postCodeError}</div>}
                            </div>
                            <div>
                                {/* <label htmlFor="addressCountry">Country</label> */}
                                <input 
                                type="text" 
                                id="addressCountry" 
                                name="addressCountry" 
                                placeholder="Country" 
                                required={userType === 'venue'}
                                className="gateway_page_form_input" 
                                value={formValues.addressCountry}
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="gateway_page_email_input">
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Email Address" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.email}
                        onChange={handleInputChange}
                        />
                        {emailError && <div className="error_message">{emailError}</div>}
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
                        value={formValues.verify_password}
                        onChange={handleInputChange}
                        />
                        {verifyPasswordError && <div className="error_message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton disabled={!requiredFieldsFilled} />
                </form>
                }
                <RedirectToLogin />
            </main>
        </section>

    )
}