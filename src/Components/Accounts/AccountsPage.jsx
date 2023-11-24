import { Outlet, Link, useLocation } from "react-router-dom"
import logo from '../../assets/Interface/Logos/gigin_logo.svg'
import './accounts.css'

export default function AccountsPage() {

    const location = useLocation();

    const currentPath = location.pathname;

    let titleContent;
    let complementaryContent;
    let forgotPassword;
    if (currentPath === '/account') {
        titleContent = <h1 className="accounts_title">Log in to your account.</h1>;
        complementaryContent = <h2 className="accounts_complementary_text">Don't have an account? <Link to={'/account/signup'} className="link">Sign up</Link></h2>
        forgotPassword = <p><Link to={'/account/forgotpassword'} className="link">Forgot your password?</Link></p>
    } else if (currentPath === '/account/signup') {
        titleContent = <h1 className="accounts_title">Join our users finding and hosting gigs!</h1>;
        complementaryContent = <h2 className="accounts_complementary_text">Already made an account? <Link to={'/account'} className="link">Log in</Link></h2>
    } else if (currentPath === '/account/forgotpassword') {
        titleContent = <h1 className="accounts_title">Ooo you've forgotten your password!</h1>;
        complementaryContent = <h2 className="accounts_complementary_text">Think you've remembered it? <Link to={'/account'} className="link">Log in</Link></h2>
    }

    

    return (
        <>
            <main className="accounts_body">
                <section className="accounts_right_side">
                    <Link to="/" className="gigin_logo">
                        <img src={logo} alt="Gigin Logo" className="logo_img" />
                        <h1 className="logo_text">gigin</h1>
                    </Link>
                    <div className="accounts_title_cont">
                        {titleContent}
                        {complementaryContent}
                    </div>
                    <Outlet />
                    <div className="accounts_forgot_password">
                        {forgotPassword}
                    </div>
                </section>
                <section className="accounts_left_side">
                    <div className="accounts_left_side_text">

                    </div>
                </section>
            </main>
        </>
    )
}