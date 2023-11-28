import { useState } from "react"

export default function SavedVenues() {

    const [savedVenues, setSavedVenues] = useState([]);

    return (
        <>
        <h1 className="controlcentre_section_header">Saved Venues</h1>
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