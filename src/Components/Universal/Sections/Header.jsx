import { LogInButton, ImAVenueButton, ControlCentreLink } from "../Features/Buttons"
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {

    const userLoggedIn = sessionStorage.getItem('Email');

    return (
        <header className="header">
            <figure className="header_left_flex">
                <Link to="/">
                    <img src="/src/Assets/Interface/Logos/gigin-logo.PNG" alt="Gigin Logo" className="header_logo" />
                </Link>
            </figure>
            <div className="header_right_flex">
                {userLoggedIn ? (
                    <ControlCentreLink />
                ) : (
                    <ImAVenueButton />
                )
                }
                <LogInButton />
            </div>
        </header>
    )
}