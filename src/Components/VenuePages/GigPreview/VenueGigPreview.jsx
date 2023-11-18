import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import './venue_gig_preview.css'

export default function VenueGigPreview() {

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
            <div className="venue_gig_preview">
                <h1>{gigData.gigDate.long}</h1>
                <h2>{gigData.gigStartTime}</h2>
                <h3>{gigData.gigDuration} minutes</h3>
                <h4>£{gigData.gigFee}</h4>
                <h5>{gigData.gigAddress.address1}</h5>
                <h5>{gigData.gigAddress.city}</h5>
                <h5>{gigData.gigAddress.country}</h5>
                <h5>{gigData.gigAddress.postCode}</h5>
                <ul>
                    <li>Genres:</li>
                    {gigData.gigGenres.map((genre, index) => (
                        <li key={index}>
                            {genre}
                        </li>
                    ))}
                </ul>
                <p>Music Type: {gigData.gigMusicType}</p>
                <p>Musician arrival time: {gigData.gigArrivalTime}</p>
                <p>Extra Information: {gigData.gigExtraInformation}</p>
            </div>
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