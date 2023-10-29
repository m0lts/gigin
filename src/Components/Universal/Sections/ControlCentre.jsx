import Header from "./Header"
import './controlcentre.css'

export default function ControlCentre() {

    const userName = sessionStorage.getItem('Alias');

    return (
        <>
        <Header />
        <main className="controlcentre_main">
            <section className="controlcentre_header">
                <h1 className="controlcentre_heading">Control Centre</h1>
            </section>
            <section className="controlcentre">
                <div className="controlcentre_options">
                    <h2 className="controlcentre_username">{userName}</h2>
                    <ul className="controlcentre_list">
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Profile
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Build a gig
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Gig responses
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Upcoming confirmed gigs
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Previous gigs
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Ratings
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Saved artists
                            </a>
                        </li>
                        <li className="controlcentre_list_item">
                            <a href="#" className="controlcentre_link">
                                Financials
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="controlcentre_window">
                    <h1>window</h1>
                </div>
            </section>
        </main>

        </>
    )
}