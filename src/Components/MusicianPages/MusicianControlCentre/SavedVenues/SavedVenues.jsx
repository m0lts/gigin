import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function SavedVenues({  savedVenues, musicianID }) {

    const [savedVenueProfiles, setSavedVenueProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const profiles = [];
            for (const userID of savedVenues) {
                try {
                    const response = await fetch('/api/Profiles/VenueProfiles/FindVenueProfile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userID
                        }),
                    });
                    const responseData = await response.json();
                    profiles.push(responseData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setSavedVenueProfiles(profiles);
        };

        fetchProfiles();
        
    }, [savedVenues || savedVenueProfiles]);

    // Remove artists from saved artists
    const handleRemoveSavedVenue = async (venueID) => {
        const payload = {
            venueID: venueID,
            musicianID: musicianID,
        }
        try {
            const response = await fetch('/api/Profiles/MusicianProfiles/RemoveSavedVenue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Removed saved venue.')
                    const updatedProfiles = savedVenueProfiles.filter(profile => profile.venueProfile.userID !== venueID);
                    setSavedVenueProfiles(updatedProfiles);    
                }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <h1 className="controlcentre_section_header">Saved Venues</h1>
        <div className="controlcentre_section_body">
            {savedVenueProfiles ? (
                <>
                {savedVenueProfiles.length > 0 ? (
                    <ul className="control_centre_horizontal_list">
                        {savedVenueProfiles.map((profile, index) => (
                            <li key={index} className="controlcentre_cards">
                                <FontAwesomeIcon icon={faBookmark} className="bookmark_icon" onClick={() => handleRemoveSavedVenue(profile.venueProfile.userID)}/>
                                <img src={profile.venueProfile.profilePicture} alt={profile.venueProfile.userName} className="profile_img" />
                                <h2 className="profile_text">{profile.venueProfile.userName}</h2>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="controlcentre_no_gigs">
                        Your saved venues will appear here.
                    </div>
                )}
            </>
            ) : (
                <div className='loading_modal'>
                    <div className="loader"></div>
                        <div className="loading_modal_message">
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}