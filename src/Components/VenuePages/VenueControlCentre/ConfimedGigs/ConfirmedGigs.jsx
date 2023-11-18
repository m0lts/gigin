import { useState } from "react"

export default function ConfirmedGigs() {

    const [confirmedGigs, setConfirmedGigs] = useState([]);

    return (
        <>
        <h1 className="controlcentre_section_header">Confirmed Gigs</h1>
        <div className="controlcentre_section_body">
            {confirmedGigs ? (
                <>
                {confirmedGigs.length > 0 ? (
                    <ul className="control_centre_horizontal_list">
                        {confirmedGigs.map((gig, index) => (
                            <li key={index} className="controlcentre_cards">
                                <h2>{gig.gigDate.long}</h2>
                                <p>{gig.gigStartTime}</p>
                                <p>{gig.gigDuration}minutes</p>
                                <p>{gig.gigFee}</p>
                            </li>
                        ))}
                    </ul>
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