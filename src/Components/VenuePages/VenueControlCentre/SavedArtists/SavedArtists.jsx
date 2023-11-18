import { useState } from "react"

export default function SavedArtists() {

    const [savedArtists, setSavedArtists] = useState([]);

    return (
        <>
        <h1 className="controlcentre_section_header">Saved Artists</h1>
        <div className="controlcentre_section_body">
            {savedArtists ? (
                <>
                {savedArtists.length > 0 ? (
                    <ul className="control_centre_horizontal_list">
                        {savedArtists.map((gig, index) => (
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
                        Your saved artists will appear here.
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