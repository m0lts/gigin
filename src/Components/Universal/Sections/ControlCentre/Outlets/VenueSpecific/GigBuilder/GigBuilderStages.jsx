import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import './gig_builder.css'

export function CalendarStage({ updateButtonAvailability, dateSelected, setDateSelected, updateGigInfo }) {

    // Send date clicked to dateSelected state
    const handleDateClick = (arg) => {
        if (arg.dayEl && !arg.dayEl.classList.contains('fc-day-past')) {
          if (dateSelected && dateSelected.dateStr === arg.dateStr) {
            // Unselect the date if it's already selected
            setDateSelected(null);
            // Update gig info with the removed dateSelected
            updateGigInfo({ dateSelected: null });
            updateButtonAvailability(false);
            arg.dayEl.style.color = ''; // Reset text color
            arg.dayEl.style.fontWeight = ''; // Reset font weight
          } else {
            // Check if another date is already selected, and unselect it if necessary
            if (dateSelected) {
              const prevSelectedEl = document.querySelector(`.fc-day[data-date="${dateSelected.dateStr}"]`);
              if (prevSelectedEl) {
                prevSelectedEl.style.color = ''; // Reset text color
                prevSelectedEl.style.fontWeight = ''; // Reset font weight
              }
            }
      
            // Select the new date
            setDateSelected(arg);
            // Update gig info with the new dateSelected
            updateGigInfo({ dateSelected: arg });
            updateButtonAvailability(true);
            arg.dayEl.style.color = 'var(--gigin-orange)';
            arg.dayEl.style.fontWeight = 700;
          }
        }
      };

    // Ensure that the dateSelected is styled correctly when re-visiting the component
    useEffect(() => {
        if (dateSelected) {
        const selectedEl = document.querySelector(`.fc-day[data-date="${dateSelected.dateStr}"]`);
        if (selectedEl) {
            selectedEl.style.color = 'var(--gigin-orange)';
            selectedEl.style.fontWeight = 700;
        }
        }
    }, [dateSelected]);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
        />
    )
}

export function GigInfoStage({ updateGigInfo, updateButtonAvailability, gigInfo }) {

    // Form data state
    const [formData, setFormData] = useState({
        musicGenres: gigInfo.musicGenres || [''],
        selectedValue: gigInfo.selectedValue || '',
        musicianArrivalTime: gigInfo.musicianArrivalTime || { hour: '00', minute: '00' },
        gigStartTime: gigInfo.gigStartTime || { hour: '00', minute: '00' },
        gigDuration: gigInfo.gigDuration || { hour: '00', minute: '00' },
        guideFee: gigInfo.guideFee || '',
        description: gigInfo.description || '',
    });

    // Time input code
    function TimeInput({ label, selectedTime, setSelectedTime, maxHour }) {
        const hours = Array.from({ length: maxHour + 1 }, (_, i) => String(i).padStart(2, '0'));
        const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
      
        const handleHourChange = (event) => {
          setSelectedTime({ ...selectedTime, hour: event.target.value });
        };
      
        const handleMinuteChange = (event) => {
          setSelectedTime({ ...selectedTime, minute: event.target.value });
        };
      
        return (
          label === 'Gig Duration' ? (
            <div className='gig_info_stage_form_time_cont'>
            <label htmlFor="time" className="gig_info_stage_form_label">{label}:</label>
            <select id="hour" name="hour" value={selectedTime.hour} onChange={handleHourChange} className='gig_info_stage_form_time_hours'>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <p className='gig_info_stage_form_time_divide_text'>hours</p>
            <select id="minute" name="minute" value={selectedTime.minute} onChange={handleMinuteChange} className='gig_info_stage_form_time_minutes'>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <p className='gig_info_stage_form_time_divide_text'>minutes</p>
          </div>
          ) : (
            <div className='gig_info_stage_form_time_cont'>
            <label htmlFor="time" className="gig_info_stage_form_label">{label}:</label>
            <select id="hour" name="hour" value={selectedTime.hour} onChange={handleHourChange} className='gig_info_stage_form_time_hours'>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <p className='gig_info_stage_form_time_divide'>:</p>
            <select id="minute" name="minute" value={selectedTime.minute} onChange={handleMinuteChange} className='gig_info_stage_form_time_minutes'>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        )
        );
      }

    // Update formData with value from form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        // Special handling for time inputs (hour and minute)
        if (name.includes('hour') || name.includes('minute')) {
          const [prefix, timeType] = name.split('-');
          setFormData((prevData) => ({
            ...prevData,
            [prefix]: {
              ...prevData[prefix],
              [timeType]: value,
            },
          }));
        } else if (name.startsWith('musicGenres')) {
            // Handling for genre select fields
            const genreIndex = Number(name.split('-')[1]);
            setFormData((prevData) => ({
                ...prevData,
                musicGenres: prevData.musicGenres.map((genre, index) => 
                    index === genreIndex ? value : genre
                ),
            }));
        } else {
          // For other inputs
          setFormData({
            ...formData,
            [name]: value,
          });
        }
    };

    // Music genres field addition and subtraction
    const addSelectField = (event) => {
        event.preventDefault();
        setFormData((prevData) => ({
          ...prevData,
          musicGenres: [...prevData.musicGenres, ""],
        }));
    };
    const removeSelectField = (event, index) => {
    event.preventDefault();
    setFormData((prevData) => {
        const updatedGenres = [...prevData.musicGenres];
        updatedGenres.splice(index, 1);
        return {
        ...prevData,
        musicGenres: updatedGenres,
        };
    });
    };

    // Preferred music type radio buttons
    const handleRadioChange = (event) => {
        setFormData({
          ...formData,
          selectedValue: event.target.value,
        });
    };



  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can send the formData object to the database or perform other actions here
    // Example: sendFormDataToDatabase(formData);
    updateGigInfo(formData);
    updateButtonAvailability(true);
  };


    return (
        <section className="gig_info_stage">
            <p className='gig_info_stage_top_message'>Fill out each stage below. The more precise you are, the better musician match you will receive.</p>
            <form action="" className='gig_info_stage_form'>
                <div className='gig_info_stage_form_cont'>
                    <label htmlFor="genre" className="gig_info_stage_form_label">
                        Genre:
                    </label>
                    {formData.musicGenres.map((genre, index) => (
                        <div key={index} className='gig_info_stage_form_genre_cont'>
                        <select
                            id={`genre-${index}`}
                            name={`musicGenres-${index}`}
                            className="gig_info_stage_form_select_genre"
                            value={genre}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a Genre</option>
                            <option value="pop" disabled={formData.musicGenres.includes("pop") && index !== formData.musicGenres.indexOf("pop")}>
                                Pop
                            </option>
                            <option value="rock" disabled={formData.musicGenres.includes("rock") && index !== formData.musicGenres.indexOf("rock")}>
                                Rock
                            </option>
                            <option value="hip-hop" disabled={formData.musicGenres.includes("hip-hop") && index !== formData.musicGenres.indexOf("hip-hop")}>
                                Hip-Hop
                            </option>
                            <option value="jazz" disabled={formData.musicGenres.includes("jazz") && index !== formData.musicGenres.indexOf("jazz")}>
                                Jazz
                            </option>
                            {/* Add more options for other genres as needed */}
                        </select>
                        {index > 0 && (
                            <button onClick={(event) => removeSelectField(event, index)} className="gig_info_stage_form_remove_button">
                              <FontAwesomeIcon icon={faMinusCircle} />
                            </button>
                        )}
                        </div>
                    ))}
                    {formData.musicGenres.length < 6 && (
                      <button onClick={addSelectField} className="gig_info_stage_form_add_button">
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                    )}
                </div>
                <div className="gig_info_stage_form_cont">
                    <p className="gig_info_stage_form_label">Preferred music type:</p>
                    <label htmlFor="covers" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_1 ${formData.selectedValue === 'covers' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="covers" 
                        name="covers" 
                        value="covers" 
                        className="gig_info_stage_form_radio_input"
                        onChange={handleRadioChange}
                        checked={formData.selectedValue === "covers"}
                        />
                        Covers
                    </label>
                    <label htmlFor="originals" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_2 ${formData.selectedValue === 'originals' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="originals" 
                        name="originals" 
                        value="originals" 
                        className="gig_info_stage_form_radio_input" 
                        onChange={handleRadioChange}
                        checked={formData.selectedValue === "originals"} 
                        />
                        Originals
                    </label>
                    <label htmlFor="both" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_3 ${formData.selectedValue === 'both' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="both" 
                        name="both" 
                        value="both" 
                        className="gig_info_stage_form_radio_input" 
                        onChange={handleRadioChange}
                        checked={formData.selectedValue === "both"} 
                        />
                        Both
                    </label>
                </div>
                <div className="gig_info_stage_form_cont">
                    <TimeInput label="Musician Arrival Time (24hrs)" selectedTime={formData.musicianArrivalTime} setSelectedTime={(time) => handleInputChange({ target: { name: 'musicianArrivalTime', value: time } })} maxHour={23} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <TimeInput label="Gig Start Time (24hrs)" selectedTime={formData.gigStartTime} setSelectedTime={(time) => handleInputChange({ target: { name: 'gigStartTime', value: time } })} maxHour={23} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <TimeInput label="Gig Duration" selectedTime={formData.gigDuration} setSelectedTime={(time) => handleInputChange({ target: { name: 'gigDuration', value: time } })} maxHour={10} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <label htmlFor="guide_fee" className='gig_info_stage_form_label'>Guide Fee:</label>
                    <div className="gig_info_stage_form_monetary_input_container">
                        <span>£</span>
                        <input
                        type="number"
                        id="guide_fee"
                        name="guideFee"
                        className="gig_info_stage_form_input"
                        value={formData.guideFee}
                        onChange={handleInputChange}
                        pattern="[0-9]*"
                        />
                        </div>
                </div>
                <div className="gig_info_stage_form_cont">
                    <label htmlFor="description" className='gig_info_stage_form_label'>Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="gig_info_stage_form_input gig_info_description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder={
                          "Write any extra detail about the gig such as:\n" +
                          "- More details on the type of music\n" +
                          "- In-house equipment / what the musician may need to bring\n" +
                          "- Time of arrival / load in for musicians\n" +
                          "- Specific directions/parking information etc"
                        }
                    />
                </div>
                <button className='gig_info_form_save_button' onClick={handleSubmit}>Save</button>
            </form>
        </section>
    )
}


export function ViewConfirmStage({ gigInformation }) {

  const venueName = sessionStorage.getItem('Alias');
  const venueAddress = sessionStorage.getItem('Address');

    return (
        <section className='gig_confirm_stage'>
          {/* <h2>Confirm Your Gig Information</h2> */}
        {/* <div className='gig_confirm_stage_flex_cont'> */}
          <ul className='gig_confirm_stage_left_flex'>
            <li>{gigInformation.dateSelected ? gigInformation.dateSelected.date.toString() : 'N/A'}</li>
            <li>
              <span>{gigInformation.musicGenres.length > 1 ? 'Genres:' : 'Genre:'} </span>
              {gigInformation.musicGenres[0] ? (<span className='gig_confirm_stage_genres'>{gigInformation.musicGenres[0]}</span>) : ('')}
              {gigInformation.musicGenres[1] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.musicGenres[1]}</span>) : ('')}
              {gigInformation.musicGenres[2] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.musicGenres[2]}</span>) : ('')}
              {gigInformation.musicGenres[3] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.musicGenres[3]}</span>) : ('')}
              {gigInformation.musicGenres[4] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.musicGenres[4]}</span>) : ('')}              
            </li>
            <li><span>Preferred music type: </span>{gigInformation.selectedValue}</li>
            <li><span>Musician arrival time: </span>{gigInformation.musicianArrivalTime.hour}:{gigInformation.musicianArrivalTime.minute}</li>
            <li><span>Gig start time: </span>{gigInformation.gigStartTime.hour}:{gigInformation.gigStartTime.minute}</li>
            <li><span>Gig duration: </span>{gigInformation.gigDuration.hour}:{gigInformation.gigDuration.minute}</li>
            <li><span>Guide fee: </span>£{gigInformation.guideFee}</li>
            <li><span>Description: </span>{gigInformation.description}</li>
          </ul>
          <ul className='gig_confirm_stage_right_flex'>
            <li className='gig_confirm_stage_right_venue_name'>{venueName}</li>
            <li className='gig_confirm_stage_right_venue_address'>{venueAddress}</li>
          </ul>
        {/* </div> */}
      </section>
    )
}