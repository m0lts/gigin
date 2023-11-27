import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircle } from "@fortawesome/free-solid-svg-icons";
import Header from '../Other/Header'
import MiniCalendar from "../Other/MiniCalendar";
import './gig_page.css'

export default function GigPage() {

    // Define states
    const [gigData, setGigData] = useState();
    const [dataFetched, setDataFetched] = useState(false);
    const [gigApplicationMessage, setGigApplicationMessage] = useState('');
    const [gigApplicationLoading, setGigApplicationLoading] = useState(false);

    // Get gig ID from URL
    const { id } = useParams();

    // Get gig information from location.state
    const location = useLocation();

    // If location.state is falsey, retrieve the gig data from the database
    useEffect(() => {
        if (!location.state) {
            let fetchedGigData = null;
            let fetchedVenueProfile = null;

            fetch('/api/Gigs/GatherGigData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
                .then(response => response.json())
                .then(responseData => {
                    fetchedGigData = responseData.gigDocument;

                    if (fetchedGigData && fetchedGigData.userID) {
                        return fetch('/api/Profiles/VenueProfiles/FindVenueProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userID: fetchedGigData.userID }),
                        });
                    } else {
                        throw new Error('Gig data or userID is missing.');
                    }
                })
                .then(profileResponse => profileResponse.json())
                .then(profileData => {
                    fetchedVenueProfile = profileData.venueProfile;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    if (fetchedGigData && fetchedVenueProfile) {
                        setGigData({
                            ...fetchedGigData,
                            venueProfile: fetchedVenueProfile,
                        });
                        setDataFetched(true);
                    }
                });
        } else {
            // Set gigData from location.state if it exists
            setGigData(location.state);
            setDataFetched(true);
        }
    }, [id, location.state]);


    // Redirect to login if not logged in
    const userLoggedIn = sessionStorage.getItem('userId');

    const navigate = useNavigate();

    const handleApplyToGig = async () => {
        setGigApplicationLoading(true);
        setGigApplicationMessage('');
        if (userLoggedIn) {
            const payload = {
                userID: userLoggedIn,
                gigID: gigData._id,
            }
            try {
                const response = await fetch('/api/Gigs/GigApplications.js', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                  });
            
                  // Handle relative responses and edit modal message.
                  if (response.ok) {
                    setGigApplicationLoading(false);
                    setGigApplicationMessage('Gig application recieved.')
                  } else if (response.status === 400) {
                    setGigApplicationLoading(false);
                    setGigApplicationMessage('You have already applied to this gig.')
                  }
            } catch (error) {
                console.error(error);
            }
        } else {
            sessionStorage.setItem('prevLocation', window.location.pathname);
            navigate('/account')
        }
    }

    return (
        <>
            <Header />
            {gigData ? (
                <section className="gig_page">
                    <header className="gig_page_heading">
                        <div className="gig_page_heading_left">
                            <h1>{gigData.venue}</h1>
                            <h6>{gigData.gigAddress.city}</h6>
                        </div>
                        <div className="gig_page_heading_right">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </header>
                    <figure className="gig_page_profile_picture">
                        <img src={gigData.venueProfile.profilePicture} alt="" className="gig_page_profile_picture_img" />
                    </figure>
                    <section className="gig_page_main">
                        <div className="gig_page_details">
                            <article className="gig_page_details_top">
                                <h2>{gigData.venueProfile.profileTitle}</h2>
                                <ul className="gig_page_details_features">
                                    <li>{gigData.venueProfile.profileFeatures[0]}</li>
                                    <li className="dot_icon"><FontAwesomeIcon icon={faCircle} /></li>
                                    <li>{gigData.venueProfile.profileFeatures[1]}</li>
                                    <li className="dot_icon"><FontAwesomeIcon icon={faCircle} /></li>
                                    <li>{gigData.venueProfile.profileFeatures[2]}</li>
                                </ul>
                                <hr className="line_break" />
                                <div className="gig_page_details_gig_info_cont">
                                    <h3 className="gig_page_subtitles">Gig Information:</h3>
                                    <div className="gig_page_details_info_flex">
                                        <ul className="gig_page_details_gig_info">
                                            <li className="gig_page_details_info_item">
                                                <strong>Genre(s): </strong>
                                                {gigData.gigGenres.map((genre, index) => (<p className="gig_page_details_info_item_genre" key={index}>{genre}</p>))}
                                            </li>
                                            <li className="gig_page_details_info_item">
                                                <strong>Duration: </strong>
                                                <p>{gigData.gigDuration} minutes</p>
                                            </li>
                                            <li className="gig_page_details_info_item">
                                                <strong>Arrival Time: </strong>
                                                <p>{gigData.gigArrivalTime}</p>
                                            </li>
                                            <li className="gig_page_details_info_item">
                                                <strong>Start Time: </strong>
                                                <p>{gigData.gigStartTime}</p>
                                            </li>
                                            <li className="gig_page_details_info_item">
                                                <strong>Music Type: </strong>
                                                <p className="gig_page_details_info_item_type">{gigData.gigMusicType}</p>
                                            </li>
                                        </ul>
                                        <ul className="gig_page_details_gig_extra_info">
                                            <li className="gig_page_details_info_item">
                                                <strong>Extra Information:</strong>
                                                <p>{gigData.gigExtraInformation}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                            <hr className="line_break" />
                            <article className="gig_page_details_bottom">
                                <h3 className="gig_page_subtitles">Venue Description:</h3>
                                <p>{gigData.venueProfile.profileDescription}</p>
                            </article>
                        </div>
                        <aside className="gig_page_booking_area">
                            <div className="gig_page_booking_box">
                                <div className="gig_page_booking_fee">
                                    <h2>£{gigData.gigFee}</h2>
                                    <p>gig fee</p>
                                </div>
                                <div className="gig_page_booking_date">
                                    <h3 className="gig_page_subtitles">{gigData.gigDate.long}</h3>
                                </div>
                                {/* <div className="gig_page_booking_calendar">
                                    <MiniCalendar />
                                </div> */}
                                <button className="btn apply_to_gig_button" onClick={handleApplyToGig}>
                                    {gigApplicationLoading ? (
                                        <div className="loader"></div>
                                    ) : (
                                        <>Apply to Gig</>
                                    )}
                                </button>
                                {gigApplicationMessage && 
                                    <div className="gig_application_message">
                                        {gigApplicationMessage}
                                    </div>
                                }
                            </div>
                        </aside>
                    </section>
                </section>
            ) : (
                <div className="loader_cont">
                    <div className="loader"></div>
                </div>
            )}
        </>
    )
}