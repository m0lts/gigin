import { useState } from "react";


export default function MusicianSignUpForm({ signUpData, setSignUpData}) {

    const [musicianSignUpData, setMusicianSignUpData] = useState({});
    const [nextButtonVisible, setNextButtonVisible] = useState(true);

    // Errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        // Create a copy of the existing venueSignUpData
        const updatedMusicianSignUpData = { ...musicianSignUpData };

        // Check if the input is part of the address fields
        if (['address1', 'city', 'country', 'postCode'].includes(name)) {
            // If the input is an address field, create/update the 'address' object
            updatedMusicianSignUpData.address = {
                ...updatedMusicianSignUpData.address,
                [name]: value,
            };
        } else {
            // If it's not an address field, update normally
            updatedMusicianSignUpData[name] = value;
        }

        // Set the updated data back to state
        setMusicianSignUpData(updatedMusicianSignUpData);
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
        if (!musicianSignUpData.name) {
            setNameError('* This field is required.');
        } else if (!musicianSignUpData.email) {
            setEmailError('* This field is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(musicianSignUpData.email)) {
            setEmailError('* Please enter a valid email address');
        } else if (!musicianSignUpData.phoneNumber) {
            setPhoneError('* This field is required.');
        } else if (!musicianSignUpData.address) {
            setAddressError('* This field is required.');
        } else {
            setSignUpData({
                ...signUpData,
                ...musicianSignUpData
            })
        }
    }
    
    return (
        <>
            <div className="accounts_form_input_cont">
                <label htmlFor="name" className="accounts_form_label">Stage/Band Name:</label>
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
                <button className="orange_buttons btn" onClick={handleNextStage} disabled={!musicianSignUpData.email && !musicianSignUpData.phoneNumber && !musicianSignUpData.name && !musicianSignUpData.postCode && true}>
                    Next
                </button>
            )}        
        </>
    )
}