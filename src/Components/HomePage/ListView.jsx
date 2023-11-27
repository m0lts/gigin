import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './list_view.css'

export default function ListView({ gigData }) {

    // Get venue's profile picture
    const [gigDataIncProfile, setGigDataIncProfile] = useState([]);

    const fetchProfiles = async () => {
        try {
            if (gigData && gigData.length > 0) {
                const profilePromises = gigData.map(async (gig) => {
                    try {
                        const payload = {
                            userID: gig.userID
                        };
                        const response = await fetch('/api/Profiles/VenueProfiles/FindVenueProfile.js', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        });

                        if (response.ok) {
                            const responseData = await response.json();
                            const venueProfile = responseData.venueProfile;
                            return { ...gig, venueProfile: venueProfile };
                        }
                    } catch (error) {
                        console.error('Error fetching profile picture:', error);
                    }
                    return gig;
                });

                const profiles = await Promise.all(profilePromises);
                setGigDataIncProfile(profiles);
            }
        } catch (error) {
            console.error('Error loading profile pictures:', error);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, [gigData]);

    return (
        <div className="list_view">
            {gigDataIncProfile.length > 0 && (
                gigDataIncProfile.map((gig, index) => (
                    <Link to={`/${gig._id}`} state={gig} key={index} className="gig_card">
                        {gig.venueProfile.profilePicture ? (
                            <img className='gig_card_img' src={gig.venueProfile.profilePicture} alt="" />
                        ) : (
                            <div className='gig_card_img'>
                                <div className='loader'></div>
                            </div>
                        )}
                        <div className='gig_card_text'>
                            <h5 className='gig_card_venue_name'>{gig.venue}</h5>
                            <p className='gig_card_fee'>£{gig.gigFee}</p>
                            <p className='gig_card_genres'>{gig.gigGenres[0]} {gig.gigGenres[1]}</p>
                            <p className='gig_card_date'>{gig.gigDate.short}</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}