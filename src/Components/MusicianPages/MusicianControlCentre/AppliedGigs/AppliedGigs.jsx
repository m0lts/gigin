import { useState } from "react"
import { Link } from "react-router-dom"

export default function AppliedGigs({ appliedGigs }) {

    const [profilePicture, setProfilePicture] = useState();

    return (
        <>
        <h1 className="controlcentre_section_header">Applied Gigs</h1>
        <div className="controlcentre_section_body">
        {appliedGigs ? (
            <>
                {appliedGigs.length > 0 ? (
                    <div className='control_centre_horizontal_list'>
                        {appliedGigs.map((gig, index) => (
                            <Link to={`/musician/${gig._id}`} state={gig} key={index} className="controlcentre_cards">
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
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="controlcentre_no_gigs">
                        Applied gigs will appear here.
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