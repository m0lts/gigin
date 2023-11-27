import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faMap } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import Header from "../Other/Header"
import './home_page.css'
import MapView from "./MapView";
import ListView from "./ListView"

export default function HomePage() {

    const [data, setData] = useState([]);

    // Gather gig data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/Gigs/PrintAllGigs');
                if (response.ok) {
                    const data = await response.json();
                    const currentTime = new Date();
                    const upcomingGigs = data.filter((gig) => {
                        const gigDateAndTime = new Date(`${gig.gigDate.short}T${gig.gigStartTime}:00`);
                        return gigDateAndTime > currentTime;
                    });
                    setData(upcomingGigs);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    // Handle view change
    const [showMap, setShowMap] = useState(true);

    const handleViewChange = () => {
        if (showMap) {
            setShowMap(false);
        } else {
            setShowMap(true);
        }
    }


    return (
        <>
            <Header />
            <main className="home_page_body">
                {showMap ? (
                    <>
                        <MapView 
                            gigData={data}
                            />
                        <button className="view_change_button" onClick={handleViewChange}>
                            <FontAwesomeIcon icon={faList} className="view_change_icon" />
                            List View
                        </button>
                    </>
                ) : (
                    <>
                        <ListView
                            gigData={data}
                            />
                        <button className="view_change_button" onClick={handleViewChange}>
                            <FontAwesomeIcon icon={faMap} className="view_change_icon" />
                            Map View
                        </button>
                    </>
                )}
            </main>
        </>
    )
}

                // Get gig profile picture
                // async function fetchProfilePicture(gig) {
                //     try {
                //         const payload = {
                //             userID: gig.userID,
                //         }
                //         const response = await fetch('/api/Profiles/VenueProfiles/FindVenueProfile', {
                //             method: 'POST',
                //             headers: {
                //               'Content-Type': 'application/json',
                //             },
                //             body: JSON.stringify(payload),
                //           });
                //         if (response.ok) {
                //             const venueProfileData = await response.json();
                //             setProfilePicture(venueProfileData.venueProfile.profilePicture);
                //         } else {
                //             console.error('Failed to fetch data:', response.statusText);
                //         }
                //     } catch (error) {
                //         console.error('Error fetching data:', error);
                //     }
                // }

                // Details to show when icon hovered over
                // const venueNameElement = document.createElement('div');
                // venueNameElement.textContent = `${gig.venue}`;

                // let venuePicture = document.createElement('img');
                // venuePicture.src = `${profilePicture}`;


                // const venueID = document.createElement('div');
                // venueID.textContent = `${gig.userID}`;



                // Handle hover functionality
                // markerElement.addEventListener('mouseover', function() {
                //     markerElement.classList.add('custom_marker_big');
                //     markerElement.removeChild(gigFeeElement);
                //     markerElement.appendChild(venueNameElement);
                //     markerElement.appendChild(venueID);
                //     fetchProfilePicture(gig);

                // });
                // markerElement.addEventListener('mouseout', function() {
                //     markerElement.classList.remove('custom_marker_big');
                //     markerElement.removeChild(venueNameElement);
                //     markerElement.appendChild(gigFeeElement);
                // });
