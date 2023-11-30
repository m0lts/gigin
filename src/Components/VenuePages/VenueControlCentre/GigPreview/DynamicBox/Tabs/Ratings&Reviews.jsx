import { useState, useEffect } from "react";
import './musician_profiles.css'

export default function RatingsAndReviews({ confirmedMusician }) {

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

    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                musicianProfile && (
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
                        </li>
                    </ul>
                )
            )}
        </>
    )
}