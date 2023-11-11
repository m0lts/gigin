import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './gig_overviews.css'


export default function GigOverviews({ upcomingGigs, profilePicture }) {
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
                        {upcomingGigs.map((gig, index) => (
                            <li key={index} className="controlcentre_cards">
                                <img src={profilePicture} alt="" className="controlcentre_cards_img" />
                                <h2>{gig.information.dateSelected.dateLong}</h2>
                                <p>{gig.information.gigStartTime.hour} : {gig.information.gigStartTime.minute}</p>
                                <p>{gig.information.gigDuration.hour}hrs {gig.information.gigDuration.minute}mins</p>
                                <p>{gig.information.guideFee}</p>
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