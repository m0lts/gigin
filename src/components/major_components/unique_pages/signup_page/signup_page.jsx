import { RedirectToLogin, SubmitButton } from "../../../minor_components/buttons"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function SignUpPage() {

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };


    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/">
                    <img src="/src/assets/images/logos/gigin-logo.PNG" alt="Gigin Logo" className="gateway_page_logo" />
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Sign Up</h1>
                <form action="" className="gateway_page_form">
                    <div className="gateway_page_forename_input">
                        {/* <label htmlFor="forename">First Name</label> */}
                        <input type="text" id="forename" name="forename" placeholder="First Name" className="gateway_page_form_input" />
                    </div>
                    <div className="gateway_page_surname_input">
                        {/* <label htmlFor="surname">Second Name</label> */}
                        <input type="text" id="surname" name="surname" placeholder="Second Name" className="gateway_page_form_input" />
                    </div>
                    <div className="signup_page_radio_input">
                        <p className="signup_page_radio_question">Musician or Venue?</p>
                        <div>
                            <div>
                                <input type="radio" id="musician" name="radio_select" value="musician" className="signup_page_form_radio" checked={selectedOption === 'musician'} onChange={handleRadioChange} />
                                <label htmlFor="musician" className="signup_page_form_radio">Musician</label>
                            </div>
                            <div>
                                <input type="radio" id="venue" name="radio_select" value="venue" className="signup_page_form_radio" checked={selectedOption === 'venue'} onChange={handleRadioChange} />
                                <label htmlFor="venue" className="signup_page_form_radio">Venue</label>
                            </div>
                        </div>
                    </div>
                    <div className="gateway_page_name_input">
                        <div className={selectedOption === 'musician' ? 'gateway_page_musician_name_input' : 'hidden'}>
                            {/* <label htmlFor="musician_name">Musician Name</label> */}
                            <input type="text" id="musician_name" name="musician_name" placeholder="Musician/Band Name" className="gateway_page_form_input" />
                        </div>
                        <div className={selectedOption === 'venue' ? 'gateway_page_venue_name_input' : 'hidden'}>
                            {/* <label htmlFor="venue_name">Venue Name</label> */}
                            <input type="text" id="venue_name" name="venue_name" placeholder="Venue Name" className="gateway_page_form_input" />
                        </div>
                    </div>
                    <div className="gateway_page_email_input">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="text" id="email" name="email" placeholder="Email Address" className="gateway_page_form_input" />
                    </div>
                    <div className="gateway_page_password_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" id="password" name="password" placeholder="Password" className="gateway_page_form_input" />
                    </div>
                    <div className="gateway_page_verify_password_input">
                        {/* <label htmlFor="verify_password">Repeat Password</label> */}
                        <input type="text" id="verify_password" name="verify_password" placeholder="Repeat Password" className="gateway_page_form_input" />
                    </div>
                    <SubmitButton />
                </form>
                <RedirectToLogin />
            </main>
        </section>

    )
}