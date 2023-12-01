import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './musician_profiles.css'

export default function RatingsAndReviews({ confirmedMusician, venueName }) {

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

    // Rating and review
    const [musicianRating, setMusicianRating] = useState({ 
        venue: venueName,
        musician: confirmedMusician,
        rating: 0, 
        review: '' 
    });
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('')

    const handleStarClick = (starIndex) => {
        if (starIndex === musicianRating.rating) {
          setMusicianRating({ ...musicianRating, rating: 0 });
        } else {
          setMusicianRating({ ...musicianRating, rating: starIndex });
        }
      };

      const handleReviewChange = (event) => {
        setMusicianRating({ ...musicianRating, review: event.target.value });
      };

    const handleRatingSubmission = async (e) => {
        setSubmissionLoading(true)
        e.preventDefault();
        try {
            const response = await fetch('/api/Profiles/MusicianProfiles/AddMusicianRating.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(musicianRating),
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
                musicianProfile && (
                    <ul className="applications">
                        <li className="application_card ratings">
                            <div className="user_details">
                                <figure className="img_cont">
                                    <img src={musicianProfile.musicianProfile.profilePicture} alt={musicianProfile.musicianProfile.userName} />
                                </figure>
                                <div className="text_cont">
                                    <h2>{musicianProfile.musicianProfile.userName}</h2>
                                    <p>{musicianProfile.musicianProfile.profileTitle}</p>
                                </div>
                            </div>
                            <form className="ratings_and_reviews">
                                <ul className="star_ratings">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <li className={`star ${index <= musicianRating.rating ? 'active' : ''}`} key={index}>
                                            <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(index)} />
                                        </li>
                                    ))}
                                </ul>
                                <div className="review_form">
                                    <label htmlFor="review">Write a Review:</label>
                                    <textarea 
                                        name="review" 
                                        id="review"
                                        value={musicianRating.review}
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