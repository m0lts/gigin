import { useEffect, useState } from "react";
import './applications.css';

export default function ConfirmedMusician({ confirmedMusician }) {

    const [musicianProfile, setMusicianProfile] = useState();
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                musicianProfile ? (
                    <ul className="applications">
                        <li className="application_card">
                            <div className="user_details">
                                <figure className="img_cont">
                                    <img src={musicianProfile.musicianProfile.profilePicture} alt={musicianProfile.musicianProfile.userName} />
                                </figure>
                                <div className="text_cont">
                                    <h2>{musicianProfile.musicianProfile.userName}</h2>
                                    <p>{musicianProfile.musicianProfile.profileTitle}</p>
                                </div>
                            </div>
                            <div className="contact_button">
                                <button className="contact" onClick={() => handleContactMusician(musicianProfile.musicianProfile.userID)}>Contact Musician</button>
                            </div>
                        </li>
                    </ul>
                ) : (
                    <p>No musicians have applied to your gig.</p>
                )
            )}
        </>
    )
}