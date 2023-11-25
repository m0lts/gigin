import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import './map_view.css';

// Change with env.process.MAPBOX_KEY
mapboxgl.accessToken = "pk.eyJ1IjoiZ2lnaW4iLCJhIjoiY2xwNDQ2ajFwMWRuNzJxczZqNHlvbHg3ZCJ9.nR_HaL-dWRkUhOgBnmbyjg";

export default function MapView({ gigData }) {
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
        if (gigData && gigData.length > 0) {
            gigData.forEach((gig) => {
                const coordinates = gig.gigAddress.coordinates;
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
    }, [gigData]);

    // Radio button
    const [selectedValue, setSelectedValue] = useState('upcoming');
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
        <div className="map_view">
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
            </div>
        </div>
    )
}