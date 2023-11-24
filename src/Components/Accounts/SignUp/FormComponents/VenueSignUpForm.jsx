import { useState } from "react";

export default function VenueSignUpForm({ signUpData, setSignUpData}) {

    const [venueSignUpData, setVenueSignUpData] = useState({});
    const [nextButtonVisible, setNextButtonVisible] = useState(true);

    // Errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Create a copy of the existing venueSignUpData
        const updatedVenueSignUpData = { ...venueSignUpData };

        // Check if the input is part of the address fields
        if (['address1', 'city', 'country', 'postCode'].includes(name)) {
            // If the input is an address field, create/update the 'address' object
            updatedVenueSignUpData.address = {
                ...updatedVenueSignUpData.address,
                [name]: value,
            };
        } else {
            // If it's not an address field, update normally
            updatedVenueSignUpData[name] = value;
        }

        // Set the updated data back to state
        setVenueSignUpData(updatedVenueSignUpData);
     };

    const handleNextStage = (event) => {
        event.preventDefault();
        setNextButtonVisible(false);
        // Reset error messages
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setAddressError('');

        // Validation checks
        if (!venueSignUpData.name) {
            setNameError('* This field is required.');
        } else if (!venueSignUpData.email) {
            setEmailError('* This field is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(venueSignUpData.email)) {
            setEmailError('* Please enter a valid email address');
        } else if (!venueSignUpData.phoneNumber) {
            setPhoneError('* This field is required.');
        } else if (!venueSignUpData.address) {
            setAddressError('* This field is required.');
        } else {
            setSignUpData({
                ...signUpData,
                ...venueSignUpData
            })
        }
    }
    
    return (
        <>
            <div className="accounts_form_input_cont">
                <label htmlFor="name" className="accounts_form_label">Venue Name:</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                {nameError && <p className="error_message">{nameError}</p>}
            </div>
            <div className="accounts_form_input_cont">
                <label htmlFor="email" className="accounts_form_label">Email Address:</label>
                <input 
                type="text" 
                id="email" 
                name="email" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                {emailError && <p className="error_message">{emailError}</p>}
            </div>
            <div className="accounts_form_input_cont">
                <label htmlFor="phoneNumber" className="accounts_form_label">Phone Number:</label>
                <input 
                type="text" 
                id="phoneNumber" 
                name="phoneNumber" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                {phoneError && <p className="error_message">{phoneError}</p>}
            </div>
            <div className="accounts_form_input_cont">
                <label htmlFor="address1" className="accounts_form_label">Address Line 1:</label>
                <input 
                type="text" 
                id="address1" 
                name="address1" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                <label htmlFor="city" className="accounts_form_label">City:</label>
                <input 
                type="text" 
                id="city" 
                name="city" 
                className="accounts_form_input"
                onChange={handleInputChange}
                />
                <label htmlFor="country" className="accounts_form_label">Country:</label>
                <input 
                type="text" 
                id="country" 
                name="country" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                <label htmlFor="postCode" className="accounts_form_label">Post Code:</label>
                <input 
                type="text" 
                id="postCode" 
                name="postCode" 
                onChange={handleInputChange}
                className="accounts_form_input"
                />
                {addressError && <p className="error_message">{addressError}</p>}
            </div>
            {nextButtonVisible && (
                <button className="orange_buttons btn" onClick={handleNextStage} disabled={!venueSignUpData.email && !venueSignUpData.phoneNumber && !venueSignUpData.name && !venueSignUpData.postCode && true}>
                    Next
                </button>
            )}        
        </>
    )
}