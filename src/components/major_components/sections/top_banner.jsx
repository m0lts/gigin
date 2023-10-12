import { LogInButton, ImAVenueButton } from "../../minor_components/buttons"

export default function TopBanner() {
    return (
        <header className="top_banner">
            <figure className="top_banner_left_flex">
                <img src="/assets/images/logos/gigin-logo.PNG" alt="Gigin Logo" className="top_banner_logo" />
            </figure>
            <div className="top_banner_right_flex">
                <ImAVenueButton />
                <LogInButton />
            </div>
        </header>
    )
}