import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './musician_profiles.css'

export default function RatingsAndReviews({ musicianName, venueID }) {

    const [venueProfile, setVenueProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const userID = venueID;
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
                setVenueProfile(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProfile();
    }, []);

    // Rating and review
    const [venueRating, setVenueRating] = useState({ 
        musician: musicianName,
        venue: venueID,
        rating: 0, 
        review: '' 
    });
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('')

    const handleStarClick = (starIndex) => {
        if (starIndex === venueRating.rating) {
          setVenueRating({ ...venueRating, rating: 0 });
        } else {
          setVenueRating({ ...venueRating, rating: starIndex });
        }
      };

      const handleReviewChange = (event) => {
        setVenueRating({ ...venueRating, review: event.target.value });
      };

    const handleRatingSubmission = async (e) => {
        setSubmissionLoading(true)
        e.preventDefault();
        try {
            const response = await fetch('/api/Profiles/VenueProfiles/AddVenueRating.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(venueRating),
                });

                if (response.ok) {
                    setSubmissionLoading(false);
                    setSubmissionMessage('Review submitted successfully.')
                } else {
                    setSubmissionLoading(false);
                    setSubmissionMessage('Error with review submission.')
                }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                venueProfile && (
                    <ul className="applications">
                        <li className="application_card ratings">
                            <div className="user_details">
                                <figure className="img_cont">
                                    <img src={venueProfile.venueProfile.profilePicture} alt={venueProfile.venueProfile.userName} />
                                </figure>
                                <div className="text_cont">
                                    <h2>{venueProfile.venueProfile.userName}</h2>
                                    <p>{venueProfile.venueProfile.profileTitle}</p>
                                </div>
                            </div>
                            <form className="ratings_and_reviews">
                                <ul className="star_ratings">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <li className={`star ${index <= venueRating.rating ? 'active' : ''}`} key={index}>
                                            <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(index)} />
                                        </li>
                                    ))}
                                </ul>
                                <div className="review_form">
                                    <label htmlFor="review">Write a Review:</label>
                                    <textarea 
                                        name="review" 
                                        id="review"
                                        value={venueRating.review}
                                        onChange={handleReviewChange}
                                    ></textarea>
                                </div>
                                <div>
                                    <button className="orange_buttons" onClick={handleRatingSubmission}>
                                        {submissionLoading ? (
                                            <div className="loader"></div>
                                        ) : (
                                            <p>Submit Review</p>
                                        )}
                                    </button>
                                    {submissionMessage && (
                                        <p>{submissionMessage}</p>
                                    )}
                                </div>
                            </form>
                        </li>
                    </ul>
                )
            )}
        </>
    )
}