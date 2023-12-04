import { useState } from "react"
import { Link } from "react-router-dom"

export default function ConfirmedGigs({ confirmedGigs }) {

    return (
        <>
        <h1 className="controlcentre_section_header">Confirmed Gigs</h1>
        <div className="controlcentre_section_body">
            {confirmedGigs ? (
                <>
                {confirmedGigs.length > 0 ? (
                    <div className='control_centre_horizontal_list'>
                        {confirmedGigs.map((gig, index) => (
                            <Link to={`/musician/${gig._id}`} state={gig} key={index} className="controlcentre_cards">
                                <li key={index} className="controlcentre_cards">
                                    <h2>{gig.gigDate.long}</h2>
                                    <p>{gig.gigStartTime}</p>
                                    <p>{gig.gigDuration}minutes</p>
                                    <p>{gig.gigFee}</p>
                                </li>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="controlcentre_no_gigs">
                        Your confirmed gigs will appear here.
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