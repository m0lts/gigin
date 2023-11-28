import { useEffect, useState } from "react";
import './applications.css'

export default function Applications({ gigApplications }) {
    const [applyersProfiles, setApplyersProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                    <button className="accept">Accept</button>
                                    <button className="decline">Decline</button>
                                </div>
                                {/* ... and other profile information */}
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