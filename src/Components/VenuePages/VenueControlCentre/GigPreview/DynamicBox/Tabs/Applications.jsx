import { useEffect, useState } from "react";
import './applications.css'

export default function Applications({ gigApplications, gigID, setSelectedTab, confirmedMusician, venueID }) {
    const [applyersProfiles, setApplyersProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonTexts, setButtonTexts] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const profiles = [];
            for (const userID of gigApplications) {
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
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setApplyersProfiles(profiles);
        };

        fetchProfiles();
    }, []);

    // Accept musician application
    const handleAccept = async (musicianID) => {
        const payload = {
            gigID: gigID,
            musicianID: musicianID,
        }
        try {
            const response = await fetch('/api/Applications/AcceptGigApplication.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });
        
                // Handle relative responses and edit modal message.
                if (response.ok) {
                    setSelectedTab('Payment');
                } else if (response.status === 400) {
                
                }
        } catch (error) {
            console.error(error);
        }
    }

    // Decline musician application
    const handleDecline = async (musicianID) => {
        const payload = {
            gigID: gigID,
            musicianID: musicianID,
        }
        try {
            const response = await fetch('/api/Applications/DeclineGigApplication.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const updatedProfiles = applyersProfiles.filter(profile => profile.musicianProfile.userID !== musicianID);
                    setApplyersProfiles(updatedProfiles);
                }

        } catch (error) {
            console.error(error);
        }
    }

    // Handle save artist
    const handleSaveArtist = async (musicianID, index) => {
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
                    const updatedButtonTexts = [...buttonTexts];
                    updatedButtonTexts[index] = 'Artist Saved';
                    setButtonTexts(updatedButtonTexts);
                } else if (response.status === 201) {
                    const updatedButtonTexts = [...buttonTexts];
                    updatedButtonTexts[index] = 'Artist already saved.';
                    setButtonTexts(updatedButtonTexts);
                }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (applyersProfiles.length > 0) {
            const initialTexts = Array(applyersProfiles.length).fill('Save Artist');
            setButtonTexts(initialTexts);
        }
    }, [applyersProfiles]);


    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                applyersProfiles ? (
                    <ul className="applications">
                        {applyersProfiles.map((musicianProfile, index) => (
                            <li key={index} className="application_card">
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
                                    {!confirmedMusician && (
                                        <>
                                            <button className="accept" onClick={() => handleAccept(musicianProfile.musicianProfile.userID)}>Accept</button>
                                            <button className="decline" onClick={() => handleDecline(musicianProfile.musicianProfile.userID)}>Decline</button>
                                        </>
                                    )}
                                    <button className={`save_artist ${index}`} onClick={() => handleSaveArtist(musicianProfile.musicianProfile.userID, index)}>{buttonTexts[index]}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No musicians have applied to your gig.</p>
                )
            )}
        </>
    )
}