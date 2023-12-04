import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import DynamicBox from "../DynamicBox/DynamicBox";

export default function MusicianGigPreview() {

    // Define gigData state
    const [gigData, setGigData] = useState();

    // Get gig ID from URL
    const { id } = useParams();

    // Get gig information from location.state
    const location = useLocation();

    // If location.state is falsey, retrieve the gig data from the database
    useEffect(() => {
        if (!location.state) {
            fetch('/api/Gigs/GatherGigData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
                .then(response => response.json())
                .then(responseData => {
                    setGigData(responseData.gigDocument);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            // Set gigData from location.state if it exists
            setGigData(location.state);
        }
    }, [id, location.state]);


    return (
        <>
            {gigData ? (
            <>
                <div className="venue_gig_preview">
                    <h1>{gigData.gigDate.long}</h1>
                    <h2>{gigData.gigStartTime}</h2>
                    <h4>£{gigData.gigFee}</h4>
                </div>
                <div className="venue_gig_preview_dynamic_box">
                    <DynamicBox
                        gigData={gigData}
                    />
                </div>
            </>
        ) : (
            <div className='loading_modal'>
                    <div className="loader"></div>
                    <div className="loading_modal_message">
                        <p>Loading...</p>
                    </div>
            </div>
        )}
        </>
    )
}