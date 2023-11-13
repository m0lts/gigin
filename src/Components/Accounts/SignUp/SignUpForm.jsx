import { useEffect, useState } from "react";
import UserTypeFilter from "./FormComponents/UserTypeFilter";
import MusicianSignUpForm from "./FormComponents/MusicianSignUpForm";
import VenueSignUpForm from "./FormComponents/VenueSignUpForm";
import PromoterSignUpForm from "./FormComponents/PromoterSignUpForm";
import GigGoerSignUpForm from "./FormComponents/Gig-GoerSignUpForm";
import SignUpPasswordSection from "./FormComponents/SignUpPasswordSection";

export default function SignUpForm() {

    const [signUpData, setSignUpData] = useState({
        userType: '',
    })

    const [formError, setFormError] = useState('');


    // Check if signUpData has more than just userType
    const shouldShowPasswordSection = Object.keys(signUpData).length > 1;

    const handleSignUp = async (event) => {
        event.preventDefault();

        setFormError('');


        if (signUpData.userType === 'musician') {
            try {
                const response = await fetch('/api/Accounts/SignUp/MusicianSignUp.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(signUpData),
                });
          
                if (response.ok) {

                    console.log('success')
                  } else if (response.status === 400) {
                    setFormError('Email already in use.');
                  } else if (response.status === 401) {
                    setFormError('Email taken in venue database.');
                  } else if (response.status === 402) {
                    setFormError('Email taken in promoter database.');
                  } else if (response.status === 403) {
                    setFormError('Email taken in gig-goer database.');
                  } else {
                    console.log(response.error);
                  }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        } else if (signUpData.userType === 'venue') {
            try {
                const response = await fetch('/api/Accounts/SignUp/VenueSignUp.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(signUpData),
                });
          
                if (response.ok) {

                    console.log('success')
                  } else if (response.status === 400) {
                    setFormError('Email already in use.');
                  } else if (response.status === 401) {
                    setFormError('Email taken in musician database.');
                  } else if (response.status === 402) {
                    setFormError('Email taken in promoter database.');
                  } else if (response.status === 403) {
                    setFormError('Email taken in gig-goer database.');
                  } else {
                    console.log(response.error);
                  }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        } else if (signUpData.userType === 'promoter') {
            try {
                const response = await fetch('/api/Accounts/SignUp/PromoterSignUp.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(signUpData),
                });
          
                if (response.ok) {

                    console.log('success')
                  } else if (response.status === 400) {
                    setFormError('Email already in use.');
                  } else if (response.status === 401) {
                    setFormError('Email taken in musician database.');
                  } else if (response.status === 402) {
                    setFormError('Email taken in venue database.');
                  } else if (response.status === 403) {
                    setFormError('Email taken in gig-goer database.');
                  } else {
                    console.log(response.error);
                  }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        } else if (signUpData.userType === 'gig-goer') {
            try {
                const response = await fetch('/api/Accounts/SignUp/GigGoerSignUp.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(signUpData),
                });
          
                if (response.ok) {

                    console.log('success')
                  } else if (response.status === 400) {
                    setFormError('Email already in use.');
                  } else if (response.status === 401) {
                    setFormError('Email taken in musician database.');
                  } else if (response.status === 402) {
                    setFormError('Email taken in promoter database.');
                  } else if (response.status === 403) {
                    setFormError('Email taken in venue database.');
                  } else {
                    console.log(response.error);
                  }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        }
    }

    return (
        <form className="accounts_form">
            <UserTypeFilter
                signUpData={signUpData}
                setSignUpData={setSignUpData}
            />
            {signUpData.userType === 'musician' ? (
                <MusicianSignUpForm 
                    signUpData={signUpData}
                    setSignUpData={setSignUpData}
                />
            ) : signUpData.userType === 'venue' ? (
                <VenueSignUpForm 
                    signUpData={signUpData}
                    setSignUpData={setSignUpData}
                />
            ) : signUpData.userType === 'promoter' ? (
                <PromoterSignUpForm 
                    signUpData={signUpData}
                    setSignUpData={setSignUpData}
                />
            ) : signUpData.userType === 'gig-goer' ? (
                <GigGoerSignUpForm 
                    signUpData={signUpData}
                    setSignUpData={setSignUpData}
                />
            ) : null}
            {shouldShowPasswordSection && 
                <>
                    <SignUpPasswordSection 
                        signUpData={signUpData}
                        setSignUpData={setSignUpData}
                    />
                    <button onClick={handleSignUp}>Sign Up</button>
                    {formError && <p className="error_message">{formError}</p>}
                </>
            }            
        </form>
    )
}