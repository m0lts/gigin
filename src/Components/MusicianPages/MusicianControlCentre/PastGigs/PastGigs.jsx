
export default function PastGigs({ pastGigs }) {
    return (
        <>
        <h1 className="controlcentre_section_header">Past gigs</h1>
        <div className="controlcentre_section_body">
            <div className='loading_modal'>
                <div className="loader"></div>
                    <div className="loading_modal_message">
                    <p>Loading...</p>
                </div>
            </div>
        </div>
        </>
    )
}