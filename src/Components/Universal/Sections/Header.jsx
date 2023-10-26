import { LogInButton, ImAVenueButton } from "../Features/Buttons"
import './header.css'

export default function Header() {
    return (
        <header className="header">
            <figure className="header_left_flex">
                <img src="/src/Assets/Interface/Logos/gigin-logo.PNG" alt="Gigin Logo" className="header_logo" />
            </figure>
            <div className="header_right_flex">
                <ImAVenueButton />
                <LogInButton />
            </div>
        </header>
    )
}