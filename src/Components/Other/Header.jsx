import { LogInButton, ImAVenueButton, ControlCentreLink, SignUpButton } from "./Buttons"
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/Interface/Logos/gigin_logo.svg'
import './header.css'

export default function Header() {
    const navigate = useNavigate();
    const userLoggedIn = sessionStorage.getItem('userName');

    const handleUserSelection = (event) => {
        const selectedOption = event.target.value;

        // Navigate based on the selected option
        switch (selectedOption) {
            case 'Venues':
                navigate('/')
                break;
            case 'Promoters':
                navigate('/')
                break;
            case 'Musicians':
                navigate('/')
                break;
            case 'Gig-Goers':
                navigate('/')
                break;
            default:
                break;
        }
    };

    return (
        <header className="header">
            <div className="header_left_flex">
                <Link to="/" className="gigin_logo">
                    <img src={logo} alt="Gigin Logo" className="logo_img" />
                    <h1 className="logo_text">gigin</h1>
                </Link>
                {!userLoggedIn &&
                    <div className="user_type_select">
                        <p>For</p>
                        <select name="user_select" id="user_select" className="select_box" onChange={handleUserSelection}>
                            <option value="Musicians">Musicians</option>
                            <option value="Venues">Venues</option>
                            <option value="Promoters">Promoters</option>
                            <option value="Gig-Goers">Gig-Goers</option>
                        </select>
                    </div>
                }
            </div>
            <div className="header_right_flex">
                {userLoggedIn ? (
                    <>
                        <ControlCentreLink />
                        <LogInButton />
                    </>
                ) : (
                    <>
                        <LogInButton />
                        <SignUpButton />
                    </>
                )}
            </div>
        </header>
    )
}