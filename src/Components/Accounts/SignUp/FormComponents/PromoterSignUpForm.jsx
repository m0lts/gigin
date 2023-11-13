import { useState } from "react";

export default function PromoterSignUpForm({ signUpData, setSignUpData}) {

    return (
        <h1 className="coming_soon_message">Coming soon!</h1>
    )

//     const [promoterSignUpData, setPromoterSignUpData] = useState({});

//     // Errors
//     const [firstNameError, setFirstNameError] = useState('');
//     const [secondNameError, setSecondNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [phoneError, setPhoneError] = useState('');
//     const [addressError, setAddressError] = useState('');


//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setPromoterSignUpData({
//             ...promoterSignUpData,
//             [name]: value,
//         });
//     };

//     const handleNextStage = (event) => {
//         event.preventDefault();

//         // Reset error messages
//         setFirstNameError('');
//         setSecondNameError('');
//         setEmailError('');
//         setPhoneError('');
//         setAddressError('');

//         // Validation checks
//         if (!promoterSignUpData.firstName) {
//             setFirstNameError('* This field is required.');
//         } else if (!promoterSignUpData.secondName) {
//             setSecondNameError('* This field is required.');
//         } else if (!promoterSignUpData.email) {
//             setEmailError('* This field is required.');
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(promoterSignUpData.email)) {
//             setEmailError('* Please enter a valid email address');
//         } else if (!promoterSignUpData.phoneNumber) {
//             setPhoneError('* This field is required.');
//         } else if (!promoterSignUpData.address) {
//             setAddressError('* This field is required.');
//         } else {
//             setSignUpData({
//                 ...signUpData,
//                 ...promoterSignUpData
//             })
//         }
//     }
    
//     return (
//         <>
//             <div>
//                 <label htmlFor="name">First Name</label>
//                 <input 
//                 type="text" 
//                 id="firstName" 
//                 name="firstName" 
//                 onChange={handleInputChange}
//                 />
//                 {firstNameError && <p className="error_message">{firstNameError}</p>}
//             </div>
//             <div>
//                 <label htmlFor="name">Second Name</label>
//                 <input 
//                 type="text" 
//                 id="secondName" 
//                 name="secondName" 
//                 onChange={handleInputChange}
//                 />
//                 {secondNameError && <p className="error_message">{secondNameError}</p>}
//             </div>
//             <div>
//                 <label htmlFor="email">Email Address</label>
//                 <input 
//                 type="text" 
//                 id="email" 
//                 name="email" 
//                 onChange={handleInputChange}
//                 />
//                 {emailError && <p className="error_message">{emailError}</p>}
//             </div>
//             <div>
//                 <label htmlFor="phoneNumber">Phone Number</label>
//                 <input 
//                 type="text" 
//                 id="phoneNumber" 
//                 name="phoneNumber" 
//                 onChange={handleInputChange}
//                 />
//                 {phoneError && <p className="error_message">{phoneError}</p>}
//             </div>
//             <div>
//                 <label htmlFor="address">Address</label>
//                 <input 
//                 type="text" 
//                 id="address" 
//                 name="address" 
//                 onChange={handleInputChange}
//                 />
//                 {addressError && <p className="error_message">{addressError}</p>}
//             </div>
//             <button onClick={handleNextStage}>Next</button>
//         </>
//     )
}