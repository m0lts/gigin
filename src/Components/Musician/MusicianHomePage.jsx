import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { Loader } from "@googlemaps/js-api-loader"
import axios from 'axios'
import Header from "../Universal/Sections/Header"
import './musician_home_page.css'


export default function MusicianHomePage() {

    const [data, setData] = useState([]);

    useEffect(() => {
      // Make a GET request to your backend API
      fetch('/api/GatherGigData')
        .then(response => response.json())
        .then(responseData => {
            const geocodeAddress = async (address) => {
                const apiKey = 'AIzaSyD62YY50C-xucnsMC0aF3bcDGJMVGjtY2E'; // Replace with your Google API key
                const addressString = `${address.addressLine1}, ${address.addressCity}, ${address.addressPostCode}, ${address.addressCountry}`;
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`);
                const result = await response.json();
                if (result.status === 'OK' && result.results.length > 0) {
                  const location = result.results[0].geometry.location;
                  return {
                    showName: address.showName,
                    location: { lat: location.lat, lng: location.lng }
                  };
                } else {
                  return null;
                }
              };
      
              // Map over the data array and geocode each address
                Promise.all(responseData.map(geocodeAddress))
                .then(geocodedData => {
                // Filter out addresses that couldn't be geocoded
                const filteredData = geocodedData.filter(location => location);
                setData(filteredData); // Store the geocoded data in the component's state
                })
                .catch(error => {
                console.error('Error geocoding addresses:', error);
                });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);


// Google maps window
// Default location: Cambridge
    const [mapLocation, setMapLocation] = useState({
        lat: 52.2,
        lng: 0.1
    })

    useEffect(() => {
        // Create and render the map with markers and info windows when the data changes
        const initializeMap = (location) => {
          const loader = new Loader({
            apiKey: "AIzaSyD62YY50C-xucnsMC0aF3bcDGJMVGjtY2E",
            version: "weekly"
          });
    
          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
            const map = new Map(document.getElementById("map"), {
              center: location,
              zoom: 10,
            });
    
            // Create InfoWindow to display showName on marker hover
            const infoWindow = new google.maps.InfoWindow();
    
            // Add markers for each location in the data
            data.forEach(item => {
              const marker = new google.maps.Marker({
                position: item.location,
                map: map,
                title: item.showName, // Display the showName as the marker title
              });
    
              // Add event listener for marker hover
              marker.addListener("mouseover", () => {
                infoWindow.setContent(item.showName);
                infoWindow.open(map, marker);
              });
    
              // Close the info window when the mouse leaves the marker
              marker.addListener("mouseout", () => {
                infoWindow.close();
              });
            });
          });
        };
    
        if (data.length > 0) {
          initializeMap(mapLocation);
        }
      }, [data]);

    // Get the user's location when they click my location button TO BE USED AFTER PROTOTYPE PHASE
    // const [location, setLocation] = useState('Cambridge');
    // const [error, setError] = useState('');

    // const handleGetLocation = (e) => {
    //     e.preventDefault();
    //     if ("geolocation" in navigator) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const latitude = position.coords.latitude;
    //           const longitude = position.coords.longitude;
    //           setMapLocation({
    //             lat: latitude,
    //             lng: longitude
    //           })
    //           setLocation('Your Location');
    //           setError('');
    //         },
    //         (err) => {
    //           setError(`Error: ${err.message}`);
    //           setLocation('');
    //         }
    //       );
    //     } else {
    //       setError('Please enable location services on your browser.');
    //     }
    //   };


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
                            {/* <label htmlFor="location" className="fing_gig_form_label">Location</label> */}
                            <input 
                            type="text"
                            id="location"
                            value='Cambridge'
                            onChange={() => {}}
                            placeholder="Location"
                            className="find_gig_form_input"
                            />
                            {/* TO BE ADDED AFTER PROTOTYPE PHASE */}
                            {/* <button onClick={handleGetLocation} className="location_button"><FontAwesomeIcon icon={faLocationArrow} /></button>
                            {error && <p className="error_message">{error}</p>} */}
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
                <div id="map" className="map_container">
                    
                </div>
            </main>
            
            </>
        )

}