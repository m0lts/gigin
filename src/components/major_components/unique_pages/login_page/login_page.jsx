import { RedirectToSignup, SubmitButton } from "../../../minor_components/buttons"
import { Link } from "react-router-dom"

export default function LogInPage() {
    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/">
                    <img src="/src/assets/images/logos/gigin-logo.PNG" alt="Gigin Logo" className="gateway_page_logo" />
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Log in</h1>
                <form action="" className="gateway_page_form">
                    <div className="gateway_page_email_input">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="text" id="email" name="email" placeholder="Email Address" className="gateway_page_form_input" />
                    </div>
                    <div className="gateway_page_password_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" id="password" name="password" placeholder="Password" className="gateway_page_form_input" />
                    </div>
                    <SubmitButton />
                </form>
                <RedirectToSignup />
            </main>
        </section>

    )
}