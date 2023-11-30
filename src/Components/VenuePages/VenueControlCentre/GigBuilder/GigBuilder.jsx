import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarStage, GigInfoStage, ViewConfirmStage } from './GigBuilderStages'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './gig_builder.css'

export default function GigBuilder() {

    const userID = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userAddress = {
        address1: sessionStorage.getItem('userAddress1'),
        city: sessionStorage.getItem('userCity'),
        country: sessionStorage.getItem('userCountry'),
        postCode: sessionStorage.getItem('userPostCode'),
    }
    

    // Set up navigation
    const navigate = useNavigate();

    // State for data collected
    const [gigInformation, setGigInformation] = useState({
        userID: userID,
        venue: userName,
        gigAddress: userAddress,
    });

    // State for stage outlet logic
    const [buildStage, setBuildStage] = useState(0);
    const maxStage = 2
    const [nextButtonAvailable, setNextButtonAvailable] = useState(false);

    // State for calendar date selected
    const [dateSelected, setDateSelected] = useState();

    // For submission 
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionLoader, setSubmissionLoader] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');


    // Function to update nextButtonAvailable
    const updateNextButtonAvailability = (isAvailable) => {
        setNextButtonAvailable(isAvailable);
    };
    
    const updateGigInfo = (info) => {
        setGigInformation({ ...gigInformation, ...info });
    }

    // Array of components to render below
    const buildStages = [
        <CalendarStage 
            updateButtonAvailability={updateNextButtonAvailability} 
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            updateGigInfo={updateGigInfo}
        />,
        <GigInfoStage
            updateGigInfo={updateGigInfo}
            updateButtonAvailability={updateNextButtonAvailability} 
            gigInfo={gigInformation}
        />,
        <ViewConfirmStage
            gigInformation={gigInformation}
            updateGigInfo={updateGigInfo}
        />
    ];

    // Next button click logic
    const handleNextButtonClick = async () => {
        if (buildStage < maxStage) {
            if (buildStage === 0) {
                if (dateSelected) {
                    setBuildStage(buildStage + 1);
                    setNextButtonAvailable(false);
                }
            } else if (buildStage === 1) {
                if (gigInformation.gigGenres && gigInformation.gigMusicType && gigInformation.gigStartTime && gigInformation.gigDuration && gigInformation.gigFee) {
                    setNextButtonAvailable(true);
                    setBuildStage(buildStage + 1);
                }
            } 
        } else {
            setFormSubmitted(true);
            setSubmissionLoader(true);

            // Perform geocoding to get coordinates, and then post data to database
            const postcode = gigInformation.gigAddress.postCode; 

            try {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=pk.eyJ1IjoiZ2lnaW4iLCJhIjoiY2xwNDQ2ajFwMWRuNzJxczZqNHlvbHg3ZCJ9.nR_HaL-dWRkUhOgBnmbyjg`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.features && data.features.length > 0) {
                        const coordinates = data.features[0].center; 
                        const updatedGigInformation = {
                            ...gigInformation,
                            gigAddress: {
                                ...gigInformation.gigAddress,
                                coordinates: coordinates,
                            },
                        };
                        try {
                            const response = await fetch('/api/Gigs/UploadGig.js', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updatedGigInformation),
                              });
                        
                              // Handle relative responses and edit modal message.
                              if (response.ok) {
                                  setSubmissionLoader(false);
                                  setSubmissionMessage('Gig successfully posted! You are being redirected...');
                                  setTimeout(() => {
                                      setFormSubmitted(false);
                                      navigate('/venue');
                                  }, 3000)
                                } else if (response.status === 400) {
                                  setSubmissionLoader(false);
                                  setSubmissionMessage('You have already built a gig at this date and time. Please select a different date or time. You are being redirected...');
                                  setTimeout(() => {
                                      setFormSubmitted(false);
                                      setSubmissionMessage('');
                                  }, 5000)
                                } else {
                                  setSubmissionLoader(false);
                                  setSubmissionMessage('Error posting gig, please try again. You are being redirected...')
                                  setTimeout(() => {
                                      setFormSubmitted(false);
                                      setSubmissionMessage('');
                                  }, 3000)
                                }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                } else {
                    setSubmissionLoader(false);
                    setSubmissionMessage('Error posting gig, please try again. You are being redirected...')
                    setTimeout(() => {
                        setFormSubmitted(false);
                        setSubmissionMessage('');
                    }, 3000)
                }
                
            } catch (error) {
                console.error('Error geocoding address:', error);
            }
        }
    };

    // Top progress bar logic
    const handlePreviousStageClick = (stage) => {
        if (stage < buildStage) {
            setBuildStage(stage);
        }
    }


    return (
        <>
        <section className="gig_builder">
            <ul className="gig_builder_progress">
                <li onClick={() => handlePreviousStageClick(0)} className={`gig_builder_progress_item ${buildStage === 0 ? 'active' : ''}`}>
                    Select a Date
                </li>
                <li className='gig_builder_progress_arrow'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </li>
                <li onClick={() => handlePreviousStageClick(1)} className={`gig_builder_progress_item ${buildStage === 1 ? 'active' : ''} ${buildStage < 1 ? 'unavailable' : ''}`}>
                    Gig Info
                </li>
                <li className='gig_builder_progress_arrow'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </li>
                <li onClick={() => handlePreviousStageClick(2)} className={`gig_builder_progress_item ${buildStage === 2 ? 'active' : ''} ${buildStage < 2 ? 'unavailable' : ''}`}>
                    View and Confirm
                </li>
            </ul>
            <div className="gig_builder_stages">
                {formSubmitted ? (
                    <div className="gig_post_processing">
                        {submissionLoader && <div className='gig_post_processing_loader_box'> <div className="loader"></div><p>Posting gig...</p> </div>}
                        {submissionMessage && <p className='gig_post_message'>{submissionMessage}</p>}
                    </div>
                ) : (
                    <div>
                        <div className='gig_builder_stages_outlet'>
                            {buildStages[buildStage]}
                        </div>
                        <div className='gig_builder_stages_next_button'>
                            {buildStage < maxStage ? (
                                <button 
                                onClick={handleNextButtonClick} 
                                className={`next_button ${nextButtonAvailable === false && 'disabled'}`} 
                                >
                                    Next <FontAwesomeIcon icon={faArrowRightLong} />
                                </button>
                            ) : (
                                <button 
                                onClick={handleNextButtonClick} 
                                className={`next_button ${nextButtonAvailable === false && 'disabled'}`} 
                                >
                                    Post gig
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
        </>
    )
}