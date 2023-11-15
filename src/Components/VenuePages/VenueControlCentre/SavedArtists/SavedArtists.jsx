import { useState } from "react"

export default function SavedArtists() {

    const [savedArtists, setSavedArtists] = useState(false);

    return (
        <>
        <h1 className="controlcentre_section_header">Saved Artists</h1>
        <div className="controlcentre_section_body">
            {savedArtists ? (
                <h1>Saved Artists</h1>
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