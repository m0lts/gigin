import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
        <h1 className="controlcentre_section_header">Gigs you've built</h1>
        <ul className={`controlcentre_section_body ${upcomingGigs ? '' : 'loading'} `}>
        {upcomingGigs ? (
            <>
                <li className="controlcentre_cards build_a_gig_card">
                    <Link to={'/build-a-gig'} className="controlcentre_cards_link build_a_gig_card_link">
                        <FontAwesomeIcon icon={faPlusCircle} className="build_a_gig_card_icon" />
                        <h2>Build a Gig</h2>
                    </Link>
                </li>
                {upcomingGigs.length > 0 ? (
                    <>
                        {sortedUpcomingGigs.map((gig, index) => (
                            <li key={index} className="controlcentre_cards">
                                <img src={profilePicture} alt="" className="controlcentre_cards_img" />
                                <h2>{gig.gigDate.long}</h2>
                                <p>{gig.gigStartTime}</p>
                                <p>{gig.gigDuration} minutes</p>
                                <p>{gig.gigFee}</p>
                            </li>
                        ))}
                    </>
                ) : (
                    <li className="controlcentre_cards controlcentre_no_gigs_card">
                        Your built gigs will appear here.
                    </li>
                )}
            </>
            ) : (
                <div className="loader"></div>
            )}
        </ul>
        </>
    )
}