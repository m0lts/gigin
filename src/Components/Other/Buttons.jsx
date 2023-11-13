import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import './buttons.css'


export function LogInButton() {

    const navigate = useNavigate();

    const userLoggedIn = sessionStorage.getItem('Forename');

    const handleLogOut = () => {
        sessionStorage.removeItem('Forename');
        sessionStorage.removeItem('Surname');
        sessionStorage.removeItem('Type');
        sessionStorage.removeItem('Alias');
        sessionStorage.removeItem('Email');
        sessionStorage.removeItem('Address');
        navigate('/');
        window.location.reload();

    }

    if (userLoggedIn) {
        return (
            <button className="log_in_button btn">
                <Link className="log_in_link" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="1x" className="log_in_icon" /> Logout
                </Link>
            </button>
        )
    } else {
        return (
            <button className="log_in_button btn">
                <Link to="/account" className="log_in_link">
                    <FontAwesomeIcon icon={faCircleUser} size="1x" className="log_in_icon" /> Login
                </Link>
            </button>
        )
    }
}

export function ImAVenueButton() {
    return (
        <button className="im_a_venue_button btn">
            I'm a Venue
        </button>
    )
}

export function RedirectToSignup() {
    return (
        <button className="redirect_button btn">
            <Link to="/account/signup" className="redirect_link">
                New to Gigin? Click here.
            </Link>
        </button>
    )
}

export function RedirectToLogin() {
    return (
        <button className="redirect_button btn">
            <Link to="/account" className="redirect_link">
                Already have an account? Click here.
            </Link>
        </button>
    )
}

export function ControlCentreLink() {
    return (
        <button className="im_a_venue_button btn">
            <Link to="/controlcentre" className="header_link">
                Control Centre
            </Link>
        </button>
    )
}

export function SubmitButton({ disabled }) {
    return <input type="submit" className={`submit_button btn ${disabled ? 'disabled' : ''}`} disabled={disabled} />
}

