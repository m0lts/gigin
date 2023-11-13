import { useState, useRef, useEffect } from "react";
import Header from "../Other/Header"
import NotificationCentre from "./VenueCCComponents/NotificationCentre";
import GigOverviews from "./VenueCCComponents/GigOverviews";
import PastGigs from "./VenueCCComponents/PastGigs";
import QuickRating from "./VenueCCComponents/QuickRating";
import ProfileEditor from "./VenueCCComponents/ProfileEditor";
import SavedArtists from "./VenueCCComponents/SavedArtists";
import './venue_control_centre.css'



export default function VenueControlCentre() {

    // ********************* //
    // Page scroll behaviour
    const notificationRef = useRef(null);
    const gigOverviewsRef = useRef(null);
    const pastGigsRef = useRef(null);
    const quickRatingRef = useRef(null);
    const savedArtistsRef = useRef(null);
    const profileEditorRef = useRef(null);

    const [activeNavItem, setActiveNavItem] = useState(null);

    const scrollToSection = (ref) => {
      const headerHeight = document.querySelector('.controlcentre_header').offsetHeight;
      const headerHeightBuffer = headerHeight + 10;
      const targetPosition = ref.current.offsetTop - headerHeightBuffer;
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    };

    const handleScroll = () => {
        const headerHeight = document.querySelector('.controlcentre_header').offsetHeight;
        const headerHeightBuffer = headerHeight + 10;
    
        const sections = [
          { ref: notificationRef, id: 'notification_centre' },
          { ref: gigOverviewsRef, id: 'gig_overviews' },
          { ref: pastGigsRef, id: 'past_gigs' },
          { ref: quickRatingRef, id: 'quick_rating' },
          { ref: savedArtistsRef, id: 'saved_artists' },
          { ref: profileEditorRef, id: 'profile_editor' }
        ];
    
        for (const section of sections) {
          const sectionTop = section.ref.current.offsetTop - headerHeightBuffer;
          const sectionBottom = sectionTop + section.ref.current.offsetHeight;
    
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            setActiveNavItem(section.id);
            break;
          }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // **************** //
    // Component rendering logic

    const userName = sessionStorage.getItem('userName');
    const userID = sessionStorage.getItem('userId');


    // Check if user has created a profile previously.
    // If not, set userCreatedProfile to false.

    const [userCreatedProfile, setUserCreatedProfile] = useState(true);

    useEffect(() => {
        fetch('/api/Profiles/VenueProfiles/FindVenueProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID
            }),
        })
        .then(response => {
            if (response.status === 201) {
                setUserCreatedProfile(false);
              }
              return response.json();
        })
        .then(responseData => {
            console.log(responseData)

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])

    // User's gig data
    const [upcomingGigs, setUpcomingGigs] = useState();
    const [pastGigs, setPastGigs] = useState();

    // User's profile data
    const [userProfilePicture, setUserProfilePicture] = useState('');

    useEffect(() => {
        fetch('/api/Gigs/RetrieveUserSpecificGigData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID
            }),
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
            
            setUpcomingGigs(responseData.gigs);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);



    return (
        <>
        <Header />
        <main className="controlcentre_main">
            <section className="controlcentre_header">
                <h1 className="controlcentre_heading">Welcome back, {userName}.</h1>
                <nav className="controlcentre_nav">
                {userCreatedProfile ? (
                    <ul className="controlcentre_ul">
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'notification_centre' ? 'active' : ''}`}
                        onClick={() => scrollToSection(notificationRef)}
                        >
                            Notifications
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'gig_overviews' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(gigOverviewsRef)}
                        >
                            Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'quick_rating' ? 'active' : ''}`}
                        onClick={() => scrollToSection(quickRatingRef)}
                        >
                            Ratings
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'saved_artists' ? 'active' : ''}`}
                        onClick={() => scrollToSection(savedArtistsRef)}
                        >
                            Saved Artists
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'profile_editor' ? 'active' : ''}`}
                        onClick={() => scrollToSection(profileEditorRef)}
                        >
                            Profile
                        </li>
                    </ul>
                ) : (
                    <ul className="controlcentre_ul">
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'profile_editor' ? 'active' : ''}`}
                        onClick={() => scrollToSection(profileEditorRef)}
                        >
                            Profile
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'notification_centre' ? 'active' : ''}`}
                        onClick={() => scrollToSection(notificationRef)}
                        >
                            Notifications
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'gig_overviews' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(gigOverviewsRef)}
                        >
                            Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'quick_rating' ? 'active' : ''}`}
                        onClick={() => scrollToSection(quickRatingRef)}
                        >
                            Ratings
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'saved_artists' ? 'active' : ''}`}
                        onClick={() => scrollToSection(savedArtistsRef)}
                        >
                            Saved Artists
                        </li>
                    </ul>
                )}
                </nav>
            </section>
            {userCreatedProfile ? (
                <section className="controlcentre_body">
                    <div 
                        className="controlcentre_sections"
                        ref={notificationRef}
                        id="notification_centre"
                    >
                        <NotificationCentre />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={gigOverviewsRef}
                        id="gig_overviews"
                    >
                        <GigOverviews
                            upcomingGigs={upcomingGigs}
                            profilePicture={userProfilePicture}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={pastGigsRef}
                        id="past_gigs"
                    >
                        <PastGigs 
                            pastGigs={pastGigs}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={quickRatingRef}
                        id="quick_rating"
                    >
                        <QuickRating 
                            pastGigs={pastGigs}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={savedArtistsRef}
                        id="saved_artists"
                    >
                        <SavedArtists />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={profileEditorRef}
                        id="profile_editor"
                    >
                        <ProfileEditor 
                        />
                    </div>
                </section>
            ) : (
                <section className="controlcentre_body">
                    <div 
                        className="controlcentre_sections"
                        ref={profileEditorRef}
                        id="profile_editor"
                    >
                        <ProfileEditor 
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={notificationRef}
                        id="notification_centre"
                    >
                        <NotificationCentre />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={gigOverviewsRef}
                        id="gig_overviews"
                    >
                        <GigOverviews
                            upcomingGigs={upcomingGigs}
                            profilePicture={userProfilePicture}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={pastGigsRef}
                        id="past_gigs"
                    >
                        <PastGigs 
                            pastGigs={pastGigs}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={quickRatingRef}
                        id="quick_rating"
                    >
                        <QuickRating 
                            pastGigs={pastGigs}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={savedArtistsRef}
                        id="saved_artists"
                    >
                        <SavedArtists />
                    </div>
                </section>
            )}
            
        </main>

        </>
    )
}
// const userName = sessionStorage.getItem('Alias');
// const userType = sessionStorage.getItem('Type');


    // const [selectedOptionText, setSelectedOptionText] = useState('Profile');
    // const [activeLink, setActiveLink] = useState('/controlcentre');

    // const handleLinkClick = (text, path) => {
    //     setSelectedOptionText(text);
    //     setActiveLink(path);
    // }

                {/* <div className="controlcentre_options">
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
                </div> */}
