import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import NotificationCentre from "./NotificationCentre/NotificationCentre";
import PastGigs from "./PastGigs/PastGigs";
import ProfileEditor from "./ProfileEditor/ProfileEditor";
import ConfirmedGigs from "./ConfirmedGigs/ConfirmedGigs";
import SavedVenues from './SavedVenues/SavedVenues';
import './musician_control_centre.css'
import AppliedGigs from './AppliedGigs/AppliedGigs';

export default function MusicianControlCentre() {
    // ********************* //
    // Page scroll behaviour
    const notificationRef = useRef(null);
    const confirmedGigsRef = useRef(null);
    const appliedGigsRef = useRef(null);
    const pastGigsRef = useRef(null);
    const savedVenuesRef = useRef(null);
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
          { ref: appliedGigsRef, id: 'applied_gigs' },
          { ref: pastGigsRef, id: 'past_gigs' },
          { ref: savedVenuesRef, id: 'saved_venues' },
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
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [userProfileData, setUserProfileData] = useState();
    const [userSavedVenues, setUserSavedVenues] = useState();

    useEffect(() => {
        fetch('/api/Profiles/MusicianProfiles/FindMusicianProfile', {
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
            setUserProfilePicture(responseData.musicianProfile.profilePicture);
            setUserProfileData(responseData.musicianProfile);
            setUserSavedVenues(responseData.musicianProfile.savedVenues);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])


    // Musician's gig data
    const [confirmedGigs, setConfirmedGigs] = useState();
    const [appliedGigs, setAppliedGigs] = useState();
    const [pastGigs, setPastGigs] = useState();



    // Fetch user's gig information
    useEffect(() => {
        fetch('/api/Gigs/RetrieveMusicianGigData', {
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
            setConfirmedGigs(responseData.confirmedGigs);
            setAppliedGigs(responseData.appliedGigs);
            setPastGigs(responseData.pastGigs);
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
                        className={`controlcentre_li_text ${activeNavItem === 'applied_gigs' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(appliedGigsRef)}
                        >
                            Gig Applications
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'saved_venues' ? 'active' : ''}`}
                        onClick={() => scrollToSection(savedVenuesRef)}
                        >
                            Saved Venues
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
                        className={`controlcentre_li_text ${activeNavItem === 'applied_gigs' ? 'active' : ''}`} 
                        onClick={() => scrollToSection(appliedGigsRef)}
                        >
                            Gig Applications
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'past_gigs' ? 'active' : ''}`}
                        onClick={() => scrollToSection(pastGigsRef)}
                        >
                            Past Gigs 
                        </li>
                        <li 
                        className={`controlcentre_li_text ${activeNavItem === 'saved_venues' ? 'active' : ''}`}
                        onClick={() => scrollToSection(savedVenuesRef)}
                        >
                            Saved Venues
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
                        ref={appliedGigsRef}
                        id="applied_gigs"
                    >
                        <AppliedGigs
                            appliedGigs={appliedGigs}
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
                        ref={savedVenuesRef}
                        id="saved_venues"
                    >
                        <SavedVenues
                            musicianID={userID}
                            savedVenues={userSavedVenues}
                        />
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
                        <ConfirmedGigs
                            confirmedGigs={confirmedGigs}
                        />
                    </div>
                    <div 
                        className="controlcentre_sections"
                        ref={appliedGigsRef}
                        id="applied_gigs"
                    >
                        <AppliedGigs 
                            appliedGigs={appliedGigs}
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
                        ref={savedVenuesRef}
                        id="saved_venues"
                    >
                        <SavedVenues
                            musicianID={userID}
                            savedVenues={userSavedVenues}
                        />
                    </div>
                </section>
            )}
        </main>
    )
}
