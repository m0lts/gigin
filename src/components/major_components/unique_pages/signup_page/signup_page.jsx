import { RedirectToLogin, SubmitButton } from "../../../minor_components/buttons"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"



export default function SignUpPage() {

    // SET UP NAVIGATE
    const navigate = useNavigate();

    // SET STATES
    // For data packet to be sent to database
    const [formValues, setFormValues] = useState({
        forename: '',
        surname: '',
        selectedOption: '',
        musician_name: '',
        venue_name: '',
        email: '',
        password: '',
        verify_password: '',
    });
    // For selected option logic
    const [selectedOption, setSelectedOption] = useState('');
    // For validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    // For submission modal
    const [formSubmitted, setFormSubmitted] = useState(false);



    // RADIO BUTTONS LOGIC
    // Handle radio buttons logic
    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
      
        // Update the formValues with the selected option
        setFormValues({
          ...formValues,
          [value === 'musician' ? 'venue_name' : 'musician_name']: '',
          selectedOption: value,
        });
    };
    // Update the formValues whenever selectedOption changes
    useEffect(() => {
        setFormValues({
        ...formValues,
        selectedOption: selectedOption,
        });
    }, [selectedOption]);


    
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
            setEmailError(emailPattern.test(value) ? '' : '* Must be a valid email address');
        }
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords do not match');
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
            const response = await fetch('/api/addUserToDatabase.js', {
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
        
    };


    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/">
                    <img src="/src/assets/images/logos/gigin-logo.PNG" alt="Gigin Logo" className="gateway_page_logo" />
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
                                checked={selectedOption === 'musician'} 
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
                                checked={selectedOption === 'venue'} 
                                onChange={handleRadioChange} 
                                />
                                <label htmlFor="venue" className="signup_page_form_radio">Venue</label>
                            </div>
                        </div>
                    </div>
                    <div className="gateway_page_name_input">
                        <div className={selectedOption === 'musician' ? 'gateway_page_musician_name_input' : 'hidden'}>
                            {/* <label htmlFor="musician_name">Musician Name</label> */}
                            <input 
                            type="text" 
                            id="musician_name" 
                            name="musician_name" 
                            placeholder="Musician/Band Name" 
                            required={selectedOption === 'musician'}
                            className="gateway_page_form_input" 
                            value={formValues.musician_name}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className={selectedOption === 'venue' ? 'gateway_page_venue_name_input' : 'hidden'}>
                            {/* <label htmlFor="venue_name">Venue Name</label> */}
                            <input 
                            type="text" 
                            id="venue_name" 
                            name="venue_name" 
                            placeholder="Venue Name" 
                            required={selectedOption === 'venue'}
                            className="gateway_page_form_input" 
                            value={formValues.venue_name}
                            onChange={handleInputChange}
                            />
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
                        {emailError && <div className="error-message">{emailError}</div>}
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
                        value={formValues.verify_password}
                        onChange={handleInputChange}
                        />
                        {verifyPasswordError && <div className="error-message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton />
                </form>
                }
                <RedirectToLogin />
                {/* {formSubmitted ? (
                <div className="submission_modal">
                    <div className="submission_modal_box">
                        <p className="submission_modal_message">{modalMessage}</p>
                    </div>
                </div>
                ) : null} */}
            </main>
        </section>

    )
}