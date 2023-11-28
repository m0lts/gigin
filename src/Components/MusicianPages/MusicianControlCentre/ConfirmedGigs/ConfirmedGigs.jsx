import { useState } from "react"

export default function ConfirmedGigs() {

    const [confirmedGigs, setConfirmedGigs] = useState([]);

    return (
        <>
        <h1 className="controlcentre_section_header">Confirmed Gigs</h1>
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