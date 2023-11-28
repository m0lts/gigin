import { useState } from "react"

export default function AppliedGigs() {

    const [appliedGigs, setAppliedGigs] = useState([]);

    return (
        <>
        <h1 className="controlcentre_section_header">Applied Gigs</h1>
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