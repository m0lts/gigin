export default function QuickRating({ pastGigs }) {
    return (
        <>
        <h1 className="controlcentre_section_header">Quick Rating</h1>
        <ul className={`controlcentre_section_body ${pastGigs ? '' : 'loading'} `}>
        {pastGigs ? (
            <>
                {pastGigs.length > 0 ? (
                    <>
                        {pastGigs.map((gig, index) => (
                            <li key={index} className="controlcentre_cards">
                                <h2>{gig.information.dateSelected.dateLong}</h2>
                                <p>{gig.information.gigStartTime.hour} : {gig.information.gigStartTime.minute}</p>
                                <p>{gig.information.gigDuration.hour}hrs {gig.information.gigDuration.minute}mins</p>
                                <p>{gig.information.guideFee}</p>
                            </li>
                        ))}
                    </>
                ) : (
                    <li className="controlcentre_cards controlcentre_no_gigs_card">
                        Your previous gigs will appear here.
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