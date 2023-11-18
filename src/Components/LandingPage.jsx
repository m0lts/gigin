import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import mapboxgl from "mapbox-gl"
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from "./Other/Header"
import './landing_page.css'



export default function LandingPage() {

    const [data, setData] = useState([]);

    // Gather gig data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/Gigs/PrintAllGigs'); // Replace '/your-api-endpoint' with your actual API endpoint
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
    
        // Assuming `data` contains the fetched array of gig data
        if (data && data.length > 0) {
            data.forEach((gig) => {
                const coordinates = gig.gigAddress.coordinates;

                // Create a marker element
                const markerElement = document.createElement('div');
                markerElement.className = 'custom_marker';
                markerElement.textContent = `£${gig.gigFee}`; // Display gigFee

                // Create a marker and set its HTML content
                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([coordinates[0], coordinates[1]]) // Set the marker's coordinates: [longitude, latitude]
                    .addTo(map.current);
                });
        }
    }, [data]);

    mapboxgl.accessToken = '***';

    // Radio button logic
    const [selectedValue, setSelectedValue] = useState('upcoming');

    const handleRadioChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };

        return (
            <>
            <Header />
            <main className="musician_homepage_main">
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
                </div>
            </main>
            
            </>
        )

}