import { useState } from "react";


export default function MusicianSignUpForm({ signUpData, setSignUpData}) {

    const [musicianSignUpData, setMusicianSignUpData] = useState({});

    // Errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMusicianSignUpData({
            ...musicianSignUpData,
            [name]: value,
        });
    };

    const handleNextStage = (event) => {
        event.preventDefault();

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
            <div>
                <label htmlFor="name">Stage/Band Name</label>
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
                <label htmlFor="address">Address</label>
                <input 
                type="text" 
                id="address" 
                name="address" 
                onChange={handleInputChange}
                />
                {addressError && <p className="error_message">{addressError}</p>}
            </div>
            <button onClick={handleNextStage}>Next</button>
        </>
    )
}