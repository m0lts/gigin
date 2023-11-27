import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import './map_view.css';
import { MarkerElement } from './MapElements';
import MiniCalendar from '../Other/MiniCalendar';

// Change with env.process.MAPBOX_KEY
mapboxgl.accessToken = "pk.eyJ1IjoiZ2lnaW4iLCJhIjoiY2xwNDQ2ajFwMWRuNzJxczZqNHlvbHg3ZCJ9.nR_HaL-dWRkUhOgBnmbyjg";

export default function MapView({ gigData }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0.1);
    const [lat, setLat] = useState(52.2);
    const [zoom, setZoom] = useState(10);
    const [dateSelected, setDateSelected] = useState(null);
    const [selectedValue, setSelectedValue] = useState('upcoming');
    const [filteredGigs, setFilteredGigs] = useState([]);


    // Render map onto page
    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
        }
    }, []);


    // Render gigs onto map
    useEffect(() => {
        if (gigData && gigData.length > 0) {
            renderMarkers(gigData);
        }
    }, [gigData]);


    // Function to render markers
    const renderMarkers = (data) => {
        data.forEach((gig) => {

                const coordinates = gig.gigAddress.coordinates;
    
                // Create marker element
                const markerElement = document.createElement('div');
                markerElement.className = 'custom_marker';
    
                // Show gig fee by default
                const gigFeeElement = document.createElement('p');
                gigFeeElement.textContent = `£${gig.gigFee}`;
                markerElement.appendChild(gigFeeElement);
    
                // Elements to show when marker hovered over
                const gigVenue = document.createElement('h2');
                gigVenue.textContent = `${gig.venue}`;
                const gigDate = document.createElement('p');
                gigDate.textContent = `${gig.gigDate.long}`;
                const gigStartTime = document.createElement('p');
                gigStartTime.textContent = `${gig.gigStartTime}`;
            
    
                // Mouse hover additions
                markerElement.addEventListener('mouseenter', () => {
                    markerElement.classList.add('active');
                    markerElement.removeChild(gigFeeElement);
                    markerElement.appendChild(gigVenue);
                    markerElement.appendChild(gigDate);
                    markerElement.appendChild(gigStartTime);
                })
                // Mouse leave subtractions
                markerElement.addEventListener('mouseleave', () => {
                    markerElement.classList.remove('active');
                    markerElement.removeChild(gigVenue);
                    markerElement.removeChild(gigDate);
                    markerElement.removeChild(gigStartTime);
                    markerElement.appendChild(gigFeeElement);
                })
                // Marker click actions
                markerElement.addEventListener('click', () => {
                    window.location.href = `/${gig._id}`
                })
    
                // Render marker
                new mapboxgl.Marker(markerElement)
                    .setLngLat([coordinates[0], coordinates[1]])
                    .addTo(map.current);
        });
    }


    const handleDateClick = (selectedDate) => {
        setDateSelected(selectedDate);
    }

    // Radio button
    const handleRadioChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };

    // Fullscreen map
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

    return (
        <section className="map_view">
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
                        {selectedValue === 'choose' && 
                            <div className="find_gig_calendar">
                                <MiniCalendar
                                    onDateSelect={handleDateClick}
                                />
                            </div>
                        }
                    </div>
                </form>
            </div>
            <div ref={mapContainer} className="map_container">
                <div className="map_fullscreen_icon" onClick={expandMap}>
                    <FontAwesomeIcon icon={faExpand} className="fullscreen_icon"/>
                </div>
            </div>
        </section>
    )
}