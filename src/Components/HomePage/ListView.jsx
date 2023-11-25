import { useEffect, useState } from 'react';
import './list_view.css'

export default function ListView({ gigData }) {

    // Get venue's profile picture
    const [profilePictures, setProfilePictures] = useState();

    const fetchProfilePicture = async (userID) => {
        try {
            const payload = {
                userID: userID
            }
            const response = await fetch('/api/Profiles/VenueProfiles/FindVenueProfile.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
      
            if (response.ok) {
                const responseData = await response.json();
                const venueProfilePicture = responseData.venueProfile.profilePicture;
                return venueProfilePicture;
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        return null;
    }

    useEffect(() => {
        const loadProfilePictures = async () => {
            if (gigData && gigData.length > 0) {
                const picturePromises = gigData.map((gig) => fetchProfilePicture(gig.userID));
                const pictures = await Promise.all(picturePromises);
                setProfilePictures(pictures);
            }
        };

        loadProfilePictures();
    }, [gigData]);

    return (
        <div className="list_view">
            {gigData && (
                gigData.map((gig, index) => (
                    <div key={index} className="gig_card">
                        {profilePictures ? (
                            <img className='gig_card_img' src={profilePictures[index]} alt="" />
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
                    </div>
                ))
            )}
        </div>
    )
}