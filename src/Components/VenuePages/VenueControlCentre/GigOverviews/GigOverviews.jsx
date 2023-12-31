import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './gig_overviews.css'


export default function GigOverviews({ upcomingGigs, profilePicture }) {

    const [sortedUpcomingGigs, setSortedUpcomingGigs] = useState([]);

    useEffect(() => {
        if (upcomingGigs && upcomingGigs.length > 0) {
          const sortedGigs = upcomingGigs.slice().sort((a, b) => {
            const dateA = new Date(a.gigDate.short);
            const dateB = new Date(b.gigDate.short);
      
            return dateA - dateB;
          });
      
          setSortedUpcomingGigs(sortedGigs);
        }
      }, [upcomingGigs]);


    return (
        <>
        <div className="controlcentre_section_header">
            <h1>Gigs you've built</h1>
            <Link to={'/venue/gig-builder'} className="build_a_gig_link btn">
                <FontAwesomeIcon icon={faPlusCircle} className="build_a_gig_card_icon" />
                <h2>Build a Gig</h2>
            </Link>
        </div>
        <div className='controlcentre_section_body'>
        {upcomingGigs ? (
            <>
                {upcomingGigs.length > 0 ? (
                    <div className='control_centre_horizontal_list'>
                        {sortedUpcomingGigs.map((gig, index) => (
                            <Link to={`/venue/${gig._id}`} state={gig} key={index} className="controlcentre_cards">
                                <div className="controlcentre_cards_top">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt={gig.venue} className="controlcentre_cards_img" />
                                    ) : (
                                        <div className='loading_img'>
                                            <div className="loader"></div>
                                        </div>
                                    )}
                                    <h2 className="controlcentre_cards_date">{gig.gigDate.long}</h2>
                                </div>
                                <div className="controlcentre_cards_middle">
                                    <p className="controlcentre_cards_time">{gig.gigStartTime}</p>
                                    <p className="controlcentre_cards_duration">{gig.gigDuration} minutes</p>
                                    <p className="controlcentre_cards_fee">£{gig.gigFee}</p>
                                </div>
                                <div className="controlcentre_cards_bottom">
                                        <FontAwesomeIcon icon={faCircle} className="notification_icon" />
                                        {gig.gigApplications ? (
                                            <p>{gig.gigApplications.length} musician applications.</p>
                                        ) : (
                                            <p>0 musician applications.</p>
                                        )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="controlcentre_no_gigs">
                        Built gigs will appear here.
                    </div>
                )}
            </>
            ) : (
                <div className='loading_modal'>
                    <div className="loader"></div>
                    <div className="loading_modal_message">
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}