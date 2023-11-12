import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ForgotPasswordEmail from "./FormComponents/ForgotPasswordEmail";
import ForgotPasswordOTP from "./FormComponents/ForgotPasswordOTP";

export default function ForgotPasswordForm() {

    const navigate = useNavigate();

    const [forgotPasswordData, setForgotPasswordData] = useState({});

    const [resetPasswordError, setResetPasswordError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleResetPassword = async (event) => {
        event.preventDefault();

        setResetPasswordError('');

        try {
            const response = await fetch('/api/Accounts/Recovery/ResetPassword.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(forgotPasswordData),
            });
      
            if (response.ok) {
                navigate('/account')
            } else if (response.status === 400) {
                setResetPasswordError('No reset password request on database.')
            } else if (response.status === 404) {
                setResetPasswordError('No accounts are associated with that email address.')
            } else {
                setResetPasswordError('OTP incorrect.')
            }
          } catch (error) {
            console.error('An error occurred during password reset:', error);
          }


    }

    return (
        <form className="accounts_form">
            <ForgotPasswordEmail 
                forgotPasswordData={forgotPasswordData}
                setForgotPasswordData={setForgotPasswordData}
                setPasswordVisible={setPasswordVisible}
            />
            {passwordVisible && (
                <>
                <ForgotPasswordOTP 
                    forgotPasswordData={forgotPasswordData}
                    setForgotPasswordData={setForgotPasswordData}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}
            {resetPasswordError && <p className="error_message">{resetPasswordError}</p>}
        </form>
    )

}