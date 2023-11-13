import LogInEmail from "./FormComponents/LogInEmail"
import LogInPassword from "./FormComponents/LogInPassword"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogInForm() {

    const navigate = useNavigate();

    const [logInData, setLogInData] = useState({});

    const [logInError, setLogInError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogIn = async (event) => {
        event.preventDefault();
        setLogInError('');

        try {
            const response = await fetch('/api/Accounts/LogIn/UserLogIn.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(logInData),
            });
      
            if (response.ok) {
                const responseData = await response.json();
                sessionStorage.setItem('userType', responseData.account.userType);
                sessionStorage.setItem('userId', responseData.account._id);
                sessionStorage.setItem('userName', responseData.account.name);

                if (responseData.account.userType === 'musician') {
                    navigate('/');
                } else if (responseData.account.userType === 'venue') {
                    navigate('/venue-controlcentre')
                }
                
              } else if (response.status === 400) {
                  setLogInError('* No account associated with that email address. Please make an account or enter a different email.');
              } else if (response.status === 401) {
                  setLogInError('* Password incorrect');
              } else {
                alert('Login failed, please try again later.');
              }
          } catch (error) {
            console.error('Error submitting form:', error);
          }


    }

    return (
        <form className="accounts_form">
            <LogInEmail 
                logInData={logInData}
                setLogInData={setLogInData}
                setPasswordVisible={setPasswordVisible}
            />
            {passwordVisible && (
                <>
                <LogInPassword 
                    logInData={logInData}
                    setLogInData={setLogInData}
                />
                <button onClick={handleLogIn}>Log In</button>
                </>
            )}
            {logInError && <p className="error_message">{logInError}</p>}
        </form>
    )
}