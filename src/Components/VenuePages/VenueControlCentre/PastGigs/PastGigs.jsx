
export default function PastGigs({ pastGigs }) {
    return (
        <>
        <h1 className="controlcentre_section_header">Past gigs</h1>
        <div className='controlcentre_section_body'>
        {pastGigs ? (
            <>
                {pastGigs.length > 0 ? (
                    <ul className="control_centre_horizontal_list">
                        {pastGigs.map((gig, index) => (
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
                        Your previous gigs will appear here.
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