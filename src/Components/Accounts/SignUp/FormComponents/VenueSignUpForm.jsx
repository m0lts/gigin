import { useState } from "react";

export default function VenueSignUpForm({ signUpData, setSignUpData}) {

    const [venueSignUpData, setVenueSignUpData] = useState({});

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
            <div>
                <label htmlFor="name">Venue Name</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                onChange={handleInputChange}
                />
                {nameError && <p className="error_message">{nameError}</p>}
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input 
                type="text" 
                id="email" 
                name="email" 
                onChange={handleInputChange}
                />
                {emailError && <p className="error_message">{emailError}</p>}
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input 
                type="text" 
                id="phoneNumber" 
                name="phoneNumber" 
                onChange={handleInputChange}
                />
                {phoneError && <p className="error_message">{phoneError}</p>}
            </div>
            <div>
                <label htmlFor="address1">Address Line 1</label>
                <input 
                type="text" 
                id="address1" 
                name="address1" 
                onChange={handleInputChange}
                />
                <label htmlFor="city">City</label>
                <input 
                type="text" 
                id="city" 
                name="city" 
                onChange={handleInputChange}
                />
                <label htmlFor="country">Country</label>
                <input 
                type="text" 
                id="country" 
                name="country" 
                onChange={handleInputChange}
                />
                <label htmlFor="postCode">Post Code</label>
                <input 
                type="text" 
                id="postCode" 
                name="postCode" 
                onChange={handleInputChange}
                />
                {addressError && <p className="error_message">{addressError}</p>}
            </div>
            <button onClick={handleNextStage}>Next</button>
        </>
    )
}