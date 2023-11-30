import { useState, useRef, useEffect } from "react";
import Header from "../../Other/Header"
import NotificationCentre from "./NotificationCentre/NotificationCentre";
import GigOverviews from "./GigOverviews/GigOverviews";
import PastGigs from "./PastGigs/PastGigs";
import ProfileEditor from "./ProfileEditor/ProfileEditor";
import SavedArtists from "./SavedArtists/SavedArtists";
import ConfirmedGigs from "./ConfirmedGigs/ConfirmedGigs";
import './venue_control_centre.css'
import { useOutletContext } from "react-router-dom";



export default function VenueControlCentre() {

    // ********************* //
    // Page scroll behaviour
    const notificationRef = useRef(null);
    const confirmedGigsRef = useRef(null);
    const gigOverviewsRef = useRef(null);
    const pastGigsRef = useRef(null);
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
          { ref: confirmedGigsRef, id: 'confirmed_gigs' },
          { ref: gigOverviewsRef, id: 'gig_overviews' },
          { ref: pastGigsRef, id: 'past_gigs' },
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

    const outletContext = useOutletContext();
    const userID = outletContext.userID;
    const userName = outletContext.userName;
    

    // Check if user has created a profile previously.
    // If not, set userCreatedProfile to false. Else set the user's profile picture to their picture.
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
            setUserProfilePicture(responseData.venueProfile.profilePicture);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])

    // User's gig data
    const [upcomingGigs, setUpcomingGigs] = useState();
    const [pastGigs, setPastGigs] = useState();
    const [confirmedGigs, setConfirmedGigs] = useState();

    // User's profile data
    const [userProfilePicture, setUserProfilePicture] = useState('');

    // Fetch user's gig information
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

            const currentDateTime = new Date();
            const pastGigs = [];
            const upcomingGigs = [];
            const confirmedGigs = [];

            for (let index = 0; index < responseData.gigs.length; index++) {
                const gigDate = new Date(responseData.gigs[index].gigDate.short + ' ' + responseData.gigs[index].gigStartTime);

                if (responseData.gigs[index].confirmedMusician) {
                    confirmedGigs.push(responseData.gigs[index])
                } else if (gigDate < currentDateTime) {
                    pastGigs.push(responseData.gigs[index]);
                } else {
                    upcomingGigs.push(responseData.gigs[index]);
                }
            }
            setConfirmedGigs(confirmedGigs);
            setPastGigs(pastGigs);
            setUpcomingGigs(upcomingGigs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);



    return (
        <main className="controlcentre_main">
            <section className="controlcentre_header">
                {userCreatedProfile ? (
                    <h1 className="controlcentre_heading">Welcome back, {userName}.</h1>
                ) : (
                    <h1 className="controlcentre_heading">Welcome, {userName}.</h1>
                )}
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
                        className={`controlcentre_li_text ${activeNavItem === 'confirmed_gigs' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(confirmedGigsRef)}
                        >
                            Confirmed Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'gig_overviews' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(gigOverviewsRef)}
                        >
                            Built Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
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
                        className={`controlcentre_li_text ${activeNavItem === 'confirmed_gigs' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(confirmedGigsRef)}
                        >
                            Confirmed Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'gig_overviews' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(gigOverviewsRef)}
                        >
                            Built Gigs
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
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
                        ref={confirmedGigsRef}
                        id="confirmed_gigs"
                    >
                        <ConfirmedGigs
                            confirmedGigs={confirmedGigs}
                        />
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
                        ref={confirmedGigsRef}
                        id="confirmed_gigs"
                    >
                        <ConfirmedGigs />
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
                        ref={savedArtistsRef}
                        id="saved_artists"
                    >
                        <SavedArtists />
                    </div>
                </section>
            )}
        </main>
    )
}
