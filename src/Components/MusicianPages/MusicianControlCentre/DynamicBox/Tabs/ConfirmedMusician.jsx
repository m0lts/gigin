import { useEffect, useState } from "react";
import './musician_profiles.css'

export default function ConfirmedMusician({ confirmedMusician, venueID }) {

    const [musicianProfile, setMusicianProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [showMusicianProfile, setShowMusicianProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const userID = confirmedMusician;
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
                setMusicianProfile(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProfile();
    }, []);

    // Email musician if venue wants to contact them
    const handleContactMusician = async (userID) => {
        try {
            const response = await fetch('/api/Accounts/Information/GetMusicianContactDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID
                }),
            });
            const responseData = await response.json();
            const musicianEmail = responseData.musicianEmail;
            if (musicianEmail) {
                const mailtoLink = `mailto:${musicianEmail}`;
                window.location.href = mailtoLink;
            } else {
                console.error('Musician email not found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Handle save artist
    const handleSaveArtist = async (musicianID) => {
        const payload = {
            venueID: venueID,
            musicianID: musicianID,
        }
        try {
            const response = await fetch('/api/Profiles/VenueProfiles/SaveMusician.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });

                if (response.status === 200) {
                    const saveButton = document.querySelector('.save_artist');
                    saveButton.textContent = 'Artist Saved'
                } else if (response.status === 201) {
                    const saveButton = document.querySelector('.save_artist');
                    saveButton.textContent = 'Artist Already Saved'
                }

        } catch (error) {
            console.error(error);
        }
    }

    // Show musician's full profile
    const handleShowMusicianProfile = () => {
        const applicationCard = document.querySelector('.application_card');
        if (!showMusicianProfile) {
            setShowMusicianProfile(true);
            applicationCard.style.height = '500px';
            applicationCard.classList.add('full')
        } else {
            setShowMusicianProfile(false);
            applicationCard.style.height = '150px';
            applicationCard.classList.remove('full')
        }
    }

    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                musicianProfile ? (
                    <ul className="applications">
                        <li className="application_card" onClick={handleShowMusicianProfile}>
                            {showMusicianProfile ? (
                                <>
                                    <div className="user_details_full">
                                        <h1>{musicianProfile.musicianProfile.userName}</h1>
                                        <figure className="img_cont_full">
                                            <img src={musicianProfile.musicianProfile.profilePicture} alt={musicianProfile.musicianProfile.userName} />
                                        </figure>
                                        <div className="text_cont_full">
                                            <p>{musicianProfile.musicianProfile.profileTitle}</p>
                                        </div>
                                    </div>
                                    <div className="action_buttons_full">
                                        <button className="contact" onClick={() => handleContactMusician(musicianProfile.musicianProfile.userID)}>Contact Musician</button>
                                        <button className={`save_artist`} onClick={() => handleSaveArtist(musicianProfile.musicianProfile.userID)}>Save Artist</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="user_details">
                                        <figure className="img_cont">
                                            <img src={musicianProfile.musicianProfile.profilePicture} alt={musicianProfile.musicianProfile.userName} />
                                        </figure>
                                        <div className="text_cont">
                                            <h2>{musicianProfile.musicianProfile.userName}</h2>
                                            <p>{musicianProfile.musicianProfile.profileTitle}</p>
                                        </div>
                                    </div>
                                    <div className="action_buttons">
                                        <button className="contact" onClick={() => handleContactMusician(musicianProfile.musicianProfile.userID)}>Contact Musician</button>
                                        <button className={`save_artist`} onClick={() => handleSaveArtist(musicianProfile.musicianProfile.userID)}>Save Artist</button>
                                    </div>
                                </>
                            )}
                        </li>
                    </ul>
                ) : (
                    <p>No musicians have applied to your gig.</p>
                )
            )}
        </>
    )
}