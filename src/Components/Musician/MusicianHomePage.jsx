import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Header from "../Universal/Sections/Header"
import './musician_home_page.css'

export default function MusicianHomePage() {

    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const handleGetLocation = (e) => {
        e.preventDefault();
        console.log('Button clicked'); // Add this console.log to verify the button click
        if ("geolocation" in navigator) {
          console.log('Geolocation supported'); // Add this console.log to verify geolocation support
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Geolocation success callback'); // Add this console.log to verify success callback
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
              setError('');
            },
            (err) => {
              console.log('Geolocation error callback'); // Add this console.log to verify error callback
              setError(`Error: ${err.message}`);
              setLocation('');
            }
          );
        } else {
          console.log('Geolocation not supported'); // Add this console.log to verify geolocation not supported
          setError('Geolocation is not supported by your browser.');
        }
      };

    // Radio button logic
    const [selectedValue, setSelectedValue] = useState('upcoming');

    const handleRadioChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };

        return (
            <>
            <Header />
            <main>
                <div className="find_gig_box">
                    <h2>Find your next gig</h2>
                    <form action="" className="find_gig_form">
                        <div>
                            {/* <label htmlFor="location" className="fing_gig_form_label">Location</label> */}
                            <input 
                            type="text"
                            id="location"
                            value={location}
                            onChange={() => {}}
                            placeholder="Location"
                            className="find_gig_form_input"
                            />
                            <button onClick={handleGetLocation} className="location_button"><FontAwesomeIcon icon={faLocationArrow} /></button>
                            {error && <p className="error_message">{error}</p>}
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
                <div className="map_container">
                    <h1>insert map here</h1>
                </div>
            </main>
            
            </>
        )

}