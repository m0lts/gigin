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
            updateGigInfo({ gigDate: null });
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

            // Edit date format
            const selectedDate = new Date(arg.dateStr);

            const formattedDate = selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
      
            // Select the new date
            setDateSelected(arg);
            // Update gig info with the new dateSelected
            updateGigInfo({ gigDate: { short: arg.dateStr, long: formattedDate } });
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
      <section className="gig_calendar_stage">
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
        />
      </section>
    )
}

export function GigInfoStage({ updateGigInfo, updateButtonAvailability, gigInfo }) {

    // Form data state
    const [formData, setFormData] = useState({
        gigGenres: gigInfo.gigGenres || [''],
        gigMusicType: gigInfo.gigMusicType || '',
        musicianArrivalTime: gigInfo.musicianArrivalTime || { hour: '00', minute: '00' },
        gigStartTime: gigInfo.gigStartTime || { hour: '00', minute: '00' },
        gigDuration: gigInfo.gigDuration || { hour: '00', minute: '00' },
        gigFee: gigInfo.gigFee || '',
        gigExtraInformation: gigInfo.gigExtraInformation || '',
    });

    // Error states
    const [formError, setFormError] = useState(false);

    // Time input code
    function TimeInput({ label, selectedTime, setSelectedTime }) {
      const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
      const minutes = Array.from({ length: 12 }, (_, i) => String(i * 15).padStart(2, '0'));
    
      const handleHourChange = (event) => {
        const newHour = event.target.value;
        const newTime = `${newHour}:${selectedTime.split(':')[1]}`;
        setSelectedTime(newTime);
      };
    
      const handleMinuteChange = (event) => {
        const newMinute = event.target.value;
        const newTime = `${newMinute}`;
        setSelectedTime(newTime);
      };
    
      return (
        <div className='gig_info_stage_form_time_cont'>
          <label htmlFor="time" className="gig_info_stage_form_label">{label}:</label>
          {label === 'Gig Duration' ? (
            <>
              <select
                id="minute"
                name="minute"
                value={selectedTime}
                onChange={handleMinuteChange}
                className='gig_info_stage_form_time_minutes'
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              <p className='gig_info_stage_form_time_divide_text'>minutes</p>
            </>
          ) : (
            <>
              <select
                id="hour"
                name="hour"
                value={selectedTime.split(':')[0]}
                onChange={handleHourChange}
                className='gig_info_stage_form_time_hours'
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <p className='gig_info_stage_form_time_divide'>:</p>
              <select
                id="minute"
                name="minute"
                value={selectedTime.split(':')[1]}
                onChange={handleMinuteChange}
                className='gig_info_stage_form_time_minutes'
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
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
        } else if (name.startsWith('gigGenres')) {
            // Handling for genre select fields
            const genreIndex = Number(name.split('-')[1]);
            setFormData((prevData) => ({
                ...prevData,
                gigGenres: prevData.gigGenres.map((genre, index) => 
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
          gigGenres: [...prevData.gigGenres, ""],
        }));
    };
    const removeSelectField = (event, index) => {
    event.preventDefault();
    setFormData((prevData) => {
        const updatedGenres = [...prevData.gigGenres];
        updatedGenres.splice(index, 1);
        return {
        ...prevData,
        gigGenres: updatedGenres,
        };
    });
    };

    // Preferred music type radio buttons
    const handleRadioChange = (event) => {
        setFormData({
          ...formData,
          gigMusicType: event.target.value,
        });
    };



  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.gigGenres.length < 1 || formData.gigGenres[0] === '' || !formData.gigMusicType || !formData.musicianArrivalTime || !formData.gigStartTime || !formData.gigDuration || !formData.guideFee) {
      setFormError(true);
    } else {
      setFormError(false);
      updateGigInfo(formData);
      updateButtonAvailability(true);
    }    
  };


    return (
        <section className="gig_info_stage">
            <p className='gig_info_stage_top_message'>Fill out each stage below. The more precise you are, the better musician match you will receive.</p>
            <form action="" className='gig_info_stage_form'>
                <div className='gig_info_stage_form_cont'>
                    <label htmlFor="genre" className="gig_info_stage_form_label">
                        Genre:
                    </label>
                    {formData.gigGenres.map((genre, index) => (
                        <div key={index} className='gig_info_stage_form_genre_cont'>
                        <select
                            id={`genre-${index}`}
                            name={`gigGenres-${index}`}
                            className="gig_info_stage_form_select_genre"
                            value={genre}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a Genre</option>
                            <option value="pop" disabled={formData.gigGenres.includes("pop") && index !== formData.gigGenres.indexOf("pop")}>
                                Pop
                            </option>
                            <option value="rock" disabled={formData.gigGenres.includes("rock") && index !== formData.gigGenres.indexOf("rock")}>
                                Rock
                            </option>
                            <option value="hip-hop" disabled={formData.gigGenres.includes("hip-hop") && index !== formData.gigGenres.indexOf("hip-hop")}>
                                Hip-Hop
                            </option>
                            <option value="jazz" disabled={formData.gigGenres.includes("jazz") && index !== formData.gigGenres.indexOf("jazz")}>
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
                    {formData.gigGenres.length < 6 && (
                      <button onClick={addSelectField} className="gig_info_stage_form_add_button">
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                    )}
                </div>
                <div className="gig_info_stage_form_cont">
                    <p className="gig_info_stage_form_label">Preferred music type:</p>
                    <label htmlFor="covers" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_1 ${formData.gigMusicType === 'covers' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="covers" 
                        name="covers" 
                        value="covers" 
                        className="gig_info_stage_form_radio_input"
                        onChange={handleRadioChange}
                        checked={formData.gigMusicType === "covers"}
                        />
                        Covers
                    </label>
                    <label htmlFor="originals" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_2 ${formData.gigMusicType === 'originals' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="originals" 
                        name="originals" 
                        value="originals" 
                        className="gig_info_stage_form_radio_input" 
                        onChange={handleRadioChange}
                        checked={formData.gigMusicType === "originals"} 
                        />
                        Originals
                    </label>
                    <label htmlFor="both" className={`gig_info_stage_form_radio_input_label gig_info_radio_option_3 ${formData.gigMusicType === 'both' ? 'radio_clicked' : ''}`}>
                        <input 
                        type="radio" 
                        id="both" 
                        name="both" 
                        value="both" 
                        className="gig_info_stage_form_radio_input" 
                        onChange={handleRadioChange}
                        checked={formData.gigMusicType === "both"} 
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
                      name="gigFee"
                      className="gig_info_stage_form_input"
                      value={formData.gigFee}
                      onChange={handleInputChange}
                      pattern="[0-9]*"
                      />
                    </div>
                </div>
                <div className="gig_info_stage_form_cont">
                    <label htmlFor="extraInformation" className='gig_info_stage_form_label'>Extra Information:</label>
                    <textarea
                        id="extraInformation"
                        name="gigExtraInformation"
                        className="gig_info_stage_form_input gig_info_description"
                        value={formData.gigExtraInformation}
                        onChange={handleInputChange}
                        placeholder={
                          "Write any extra detail about the gig such as:\n" +
                          "- More details on the type of music\n" +
                          "- In-house equipment / what the musician may need to bring\n" +
                          "- Specific directions/parking information etc"
                        }
                    />
                </div>
                <button className='gig_info_form_save_button' onClick={handleSubmit}>Save</button>
                {formError && (
                  <p className="error_message">* Please fill out all fields. If you want to input midnight (00:00) into a time field, please click on the drop-down and select the '00' options even if already selected. </p>
                )}
            </form>
        </section>
    )
}


export function ViewConfirmStage({ gigInformation }) {

    return (
        <section className='gig_confirm_stage'>
          {/* <h2>Confirm Your Gig Information</h2> */}
        {/* <div className='gig_confirm_stage_flex_cont'> */}
          <ul className='gig_confirm_stage_left_flex'>
            <li>{gigInformation.gigDate ? gigInformation.gigDate.long : 'N/A'}</li>
            <li>
              <span>{gigInformation.gigGenres.length > 1 ? 'Genres:' : 'Genre:'} </span>
              {gigInformation.gigGenres[0] ? (<span className='gig_confirm_stage_genres'>{gigInformation.gigGenres[0]}</span>) : ('')}
              {gigInformation.gigGenres[1] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.gigGenres[1]}</span>) : ('')}
              {gigInformation.gigGenres[2] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.gigGenres[2]}</span>) : ('')}
              {gigInformation.gigGenres[3] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.gigGenres[3]}</span>) : ('')}
              {gigInformation.gigGenres[4] ? (<span className='gig_confirm_stage_genres'>, {gigInformation.gigGenres[4]}</span>) : ('')}              
            </li>
            <li><span>Preferred music type: </span>{gigInformation.gigMusicType}</li>
            <li><span>Musician arrival time: </span>{gigInformation.musicianArrivalTime.hour}:{gigInformation.musicianArrivalTime.minute}</li>
            <li><span>Gig start time: </span>{gigInformation.gigStartTime.hour}:{gigInformation.gigStartTime.minute}</li>
            <li><span>Gig duration: </span>{gigInformation.gigDuration.hour}:{gigInformation.gigDuration.minute}</li>
            <li><span>Guide fee: </span>£{gigInformation.gigFee}</li>
            <li><span>Extra Information: </span>{gigInformation.gigExtraInformation}</li>
          </ul>
          <ul className='gig_confirm_stage_right_flex'>
            <li className='gig_confirm_stage_right_venue_name'>{gigInformation.userName}</li>
          </ul>
        {/* </div> */}
      </section>
    )
}