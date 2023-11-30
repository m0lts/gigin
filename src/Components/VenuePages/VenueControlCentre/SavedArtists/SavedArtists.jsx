import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import './saved_artists.css'

// Print saved artists here from venue profile
export default function SavedArtists({ savedArtists, venueID }) {

    const [savedArtistProfiles, setSavedArtistProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const profiles = [];
            for (const userID of savedArtists) {
                try {
                    const response = await fetch('/api/Profiles/MusicianProfiles/FindMusicianProfile', {
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
            setSavedArtistProfiles(profiles);
        };

        fetchProfiles();
        
    }, [savedArtists]);

    // Remove artists from saved artists
    const handleRemoveSavedArtist = async (musicianID) => {
        const payload = {
            venueID: venueID,
            musicianID: musicianID,
        }
        try {
            const response = await fetch('/api/Profiles/VenueProfiles/RemoveSavedArtist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Removed saved artist.')
                    const updatedProfiles = savedArtistProfiles.filter(profile => profile.musicianProfile.userID !== musicianID);
                    setSavedArtistProfiles(updatedProfiles);    
                }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <h1 className="controlcentre_section_header">Saved Artists</h1>
        <div className="controlcentre_section_body">
            {savedArtistProfiles ? (
                <>
                {savedArtistProfiles.length > 0 ? (
                    <ul className="control_centre_horizontal_list">
                        {savedArtistProfiles.map((profile, index) => (
                            <li key={index} className="controlcentre_cards">
                                <FontAwesomeIcon icon={faBookmark} className="bookmark_icon" onClick={() => handleRemoveSavedArtist(profile.musicianProfile.userID)}/>
                                <img src={profile.musicianProfile.profilePicture} alt={profile.musicianProfile.userName} className="profile_img" />
                                <h2 className="profile_text">{profile.musicianProfile.userName}</h2>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="controlcentre_no_gigs">
                        Your saved artists will appear here.
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