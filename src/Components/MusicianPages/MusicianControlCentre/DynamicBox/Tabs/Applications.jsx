import { useEffect, useState } from "react";
import './musician_profiles.css'

export default function Applications({ gigApplications, gigID, setSelectedTab, confirmedMusician, venueID }) {
    const [applyersProfiles, setApplyersProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allMusicians, setAllMusicians] = useState();
    const [showAllMusicians, setShowAllMusicians] = useState(false);

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!gigApplications || gigApplications.length === 0) {
                return setLoading(false);
            } else {
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
            }
        };

        fetchProfiles();
    }, []);


    // Show musician's full profile
    const [showMusicianProfile, setShowMusicianProfile] = useState(false);
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

    // Show full list of musicians for venue to select
    const handleMusicianSearch = async () => {
        try {
            const response = await fetch('/api/Profiles/MusicianProfiles/PrintAllMusicians');
            if (response.ok) {
                const data = await response.json();
                setShowAllMusicians(true);
                setAllMusicians(data);
            } else {
                console.error('Failed to fetch data:', response.statusText);
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
                applyersProfiles && applyersProfiles.length >= 1 ? (
                    <ul className="applications">
                        {applyersProfiles.map((musicianProfile, index) => (
                            <li key={index} className="application_card" onClick={handleShowMusicianProfile}>
                            {showMusicianProfile ? (
                                <>
                                    <div className="user_details">
                                        <h1>{musicianProfile.musicianProfile.userName}</h1>
                                        <figure className="img_cont">
                                            <img src={musicianProfile.musicianProfile.profilePicture} alt={musicianProfile.musicianProfile.userName} />
                                        </figure>
                                        <div className="text_cont">
                                            <p>{musicianProfile.musicianProfile.profileTitle}</p>
                                        </div>
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
                                </>
                            )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        {showAllMusicians ? (
                            <ul>
                                {allMusicians.map((musician, index) => (
                                    <li key={index}>
                                        <p>{musician.userName}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p onClick={handleMusicianSearch}>No other musicians have applied to this gig.</p>
                        )}
                    </div>
                )
            )}
        </>
    )
}