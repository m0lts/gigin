import { useState } from "react";
import Header from "../Header"
import './controlcentre.css'
import { Link, Outlet } from "react-router-dom";


export default function ControlCentre() {

    const userName = sessionStorage.getItem('Alias');
    const userType = sessionStorage.getItem('Type');

    const [selectedOptionText, setSelectedOptionText] = useState('Profile');
    const [activeLink, setActiveLink] = useState('/controlcentre');

    const handleLinkClick = (text, path) => {
        setSelectedOptionText(text);
        setActiveLink(path);
    }

    return (
        <>
        <Header />
        <main className="controlcentre_main">
            <section className="controlcentre_header">
                <h1 className="controlcentre_heading">Control Centre</h1>
                <p>.</p>
                <h1 className="controlcentre_heading_2">{selectedOptionText}</h1>
            </section>
            <section className="controlcentre">
                <div className="controlcentre_options">
                    <h2 className="controlcentre_username">{userName}</h2>
                        {userType === 'venue' ? (
                            <ul className="controlcentre_list">
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/profile'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/profile' || activeLink === '/controlcentre' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Profile', '/controlcentre/profile')}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/gig-builder'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/gig-builder' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Build a gig', '/controlcentre/gig-builder')}
                                    >
                                        Build a gig
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/gig-responses'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/gig-responses' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Gig responses', '/controlcentre/gig-responses')}
                                    >
                                        Gig responses
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/confirmed-gigs'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/confirmed-gigs' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Upcoming confirmed gigs', '/controlcentre/confirmed-gigs')}
                                    >
                                        Upcoming confirmed gigs
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/previous-gigs'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/previous-gigs' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Previous gigs', '/controlcentre/previous-gigs')}
                                    >
                                        Previous gigs
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/ratings'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/ratings' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Ratings', '/controlcentre/ratings')}
                                    >
                                        Ratings
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/saved-artists'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/saved-artists' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Saved artists', '/controlcentre/saved-artists')}
                                    >
                                        Saved artists
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/finances'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/finances' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Finances', '/controlcentre/finances')}
                                    >
                                        Finances
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="controlcentre_list">
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/profile'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/profile' || activeLink === '/controlcentre' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Profile', '/controlcentre/profile')}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/available-dates'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/available-dates' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Available dates', '/controlcentre/available-dates')}
                                    >
                                        Available Dates
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/gig-applications'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/gig-applications' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Gig applications', '/controlcentre/gig-applications')}
                                    >
                                        Gig Applications
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/confirmed-gigs'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/confirmed-gigs' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Upcoming confirmed gigs', '/controlcentre/confirmed-gigs')}
                                    >
                                        Upcoming confirmed gigs
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/previous-gigs'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/previous-gigs' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Previous gigs', '/controlcentre/previous-gigs')}
                                    >
                                        Previous gigs
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/ratings'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/ratings' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Ratings', '/controlcentre/ratings')}
                                    >
                                        Ratings
                                    </Link>
                                </li>
                                <li className="controlcentre_list_item">
                                    <Link 
                                    to={'/controlcentre/finances'} 
                                    className={`controlcentre_link ${activeLink === '/controlcentre/finances' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('Finances', '/controlcentre/finances')}
                                    >
                                        Finances
                                    </Link>
                                </li>
                            </ul>
                        )}
                        
                </div>
                <div className="controlcentre_window">
                    <Outlet />
                </div>
            </section>
        </main>

        </>
    )
}