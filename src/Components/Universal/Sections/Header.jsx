import { LogInButton, ImAVenueButton, ControlCentreLink } from "../Features/Buttons"
import './header.css'

export default function Header() {

    const userLoggedIn = sessionStorage.getItem('Alias');

    return (
        <header className="header">
            <figure className="header_left_flex">
                <img src="/src/Assets/Interface/Logos/gigin-logo.PNG" alt="Gigin Logo" className="header_logo" />
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