import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faExpand, faList, faMap } from "@fortawesome/free-solid-svg-icons"
import mapboxgl from "mapbox-gl"
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from "./Other/Header"
import './landing_page.css'




export default function LandingPage() {
    // Change with env.process.MAPBOX_KEY
    mapboxgl.accessToken = "pk.eyJ1IjoiZ2lnaW4iLCJhIjoiY2xwNDQ2ajFwMWRuNzJxczZqNHlvbHg3ZCJ9.nR_HaL-dWRkUhOgBnmbyjg";

    const [data, setData] = useState([]);
    // const [profilePicture, setProfilePicture] = useState();

    // Gather gig data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/Gigs/PrintAllGigs');
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])

    // Map box
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0.1);
    const [lat, setLat] = useState(52.2);
    const [zoom, setZoom] = useState(10);


    useEffect(() => {
        
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
        }
        if (data && data.length > 0) {
            data.forEach((gig) => {
                const coordinates = gig.gigAddress.coordinates;

                // Build elements to populate icon when map loads
                const markerElement = document.createElement('div');
                markerElement.className = 'custom_marker';
                const gigFeeElement = document.createElement('div');
                gigFeeElement.textContent = `£${gig.gigFee}`;
                markerElement.appendChild(gigFeeElement);

                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([coordinates[0], coordinates[1]])
                    .addTo(map.current);
                });
        }
    }, [data]);

    // Radio button logic
    const [selectedValue, setSelectedValue] = useState('upcoming');

    const handleRadioChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };

    // Fullscreen map logic
    const expandMap = () => {
        const findGigBox = document.querySelector('.find_gig_box')
        findGigBox.classList.toggle('hide');
        const mapContainer = document.querySelector('.map_container');
        mapContainer.classList.toggle('fullscreen');
        setTimeout(() => {
            if (map.current) {
                map.current.resize();
            }
        }, 250);
    }

    // Toggle list view
    const [listView, setListView] = useState(false);

    const toggleListView = () => {
        if (!listView) {
            setListView(true);
        } else {
            setListView(false);
        }
    }

        return (
            <>
            <Header />
            {!listView ? (
                <main className="musician_homepage_main_map">
                    <div className="find_gig_box">
                        <h2>Find your next gig</h2>
                        <form action="" className="find_gig_form">
                            <div className="find_gig_form_location_container">
                                <input 
                                type="text"
                                id="location"
                                value='Cambridge'
                                onChange={() => {}}
                                placeholder="Location"
                                className="find_gig_form_input"
                                />
                            </div>
                            <div className="find_gig_form_radio_container">
                            <p className="find_gig_form_radio_question">When?</p>
                            <div className="find_gig_form_radio_inputs_flex">
                                <label htmlFor="upcoming" className={`find_gig_form_radio_input_label radio_option_1 ${selectedValue === 'upcoming' ? 'radio_clicked' : ''}`}>
                                    <input 
                                    type="radio" 
                                    id="upcoming" 
                                    name="upcoming" 
                                    value="upcoming" 
                                    className="find_gig_form_radio_input"
                                    onChange={handleRadioChange}
                                    checked={selectedValue === "upcoming"}
                                    />
                                    All Upcoming
                                </label>
                                <label htmlFor="choose" className={`find_gig_form_radio_input_label radio_option_2 ${selectedValue === 'choose' ? 'radio_clicked' : ''}`}>
                                    <input 
                                    type="radio" 
                                    id="choose" 
                                    name="choose" 
                                    value="choose" 
                                    className="find_gig_form_radio_input" 
                                    onChange={handleRadioChange}
                                    checked={selectedValue === "choose"} 
                                    />
                                    Choose Dates
                                </label>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div ref={mapContainer} className="map_container">
                        <div className="map_fullscreen_icon" onClick={expandMap}>
                            <FontAwesomeIcon icon={faExpand} className="fullscreen_icon"/>
                        </div>
                        <div className="toggle_list_view">
                            <button className="toggle_list_view_button btn" onClick={toggleListView}>
                                List View
                                <FontAwesomeIcon icon={faList} className="list_view_icon" />
                            </button>
                        </div>
                    </div>
                </main>
            ) : (
                <main className="musician_home_page_list">
                    <h1>list view</h1>
                    <div className="toggle_list_view">
                            <button className="toggle_list_view_button btn" onClick={toggleListView}>
                                Map View
                                <FontAwesomeIcon icon={faList} className="list_view_icon" />
                            </button>
                        </div>
                </main>
            )}

            
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
