import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import './gig_builder.css'

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
      <div>
        <label htmlFor="time">{label}:</label>
        <select id="hour" name="hour" value={selectedTime.hour} onChange={handleHourChange}>
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <p>:</p>
        <select id="minute" name="minute" value={selectedTime.minute} onChange={handleMinuteChange}>
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    );
  }

export function GigInfoStage() {

    // Form data state
    const [formData, setFormData] = useState({
        musicGenres: [], // An array to store genres
        selectedValue: '', // To store the radio button selection
        musicianArrivalTime: { hour: '00', minute: '00' }, // Time input
        gigStartTime: { hour: '00', minute: '00' }, // Time input
        gigDuration: { hour: '00', minute: '00' }, // Time input
        guideFee: '', // Monetary input
        description: '', // Textarea input
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        if (name.includes('hour') || name.includes('minute')) {
          const [prefix, timeType] = name.split('-');
          setFormData((prevData) => ({
            ...prevData,
            [prefix]: {
              ...prevData[prefix],
              [timeType]: value,
            },
          }));
        } else if (name.includes('musicGenres')) {
          const genreIndex = Number(name.split('-')[1]);
          const updatedGenres = [...formData.musicGenres];
          updatedGenres[genreIndex] = value;
          setFormData({
            ...formData,
            musicGenres: updatedGenres,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };

    const handleRadioChange = (event) => {
        setFormData({
          ...formData,
          selectedValue: event.target.value,
        });
    };

    const addSelectField = (event) => {
        event.preventDefault();
        setFormData((prevData) => ({
          ...prevData,
          musicGenres: [...prevData.musicGenres, ""],
        }));
      };
      
      const removeSelectField = (index, event) => {
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

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can send the formData object to the database or perform other actions here
    // Example: sendFormDataToDatabase(formData);
    console.log(formData); // For demonstration purposes
  };


    return (
        <section className="gig_info_stage">
            <p className='gig_info_stage_top_message'>Fill out each stage below. The more precise you are, the better musician match you will receive.</p>
            <form action="" className='gig_info_stage_form'>
                <div className='gig_info_stage_form_genre_select_cont'>
                    <label htmlFor="genre" className="gig_info_stage_form_label">
                        Genre:
                    </label>
                    {formData.musicGenres.slice(1).map((genre, index) => (
                        <div key={index} className="gig_info_stage_form_cont">
                        <select
                            id={`genre-${index}`}
                            name={`musicGenres-${index}`}
                            className="gig_info_stage_form_input"
                            value={formData.musicGenres[index]}
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
                            <button onClick={() => removeSelectField(index)} className="remove-button">
                            Remove
                            </button>
                        )}
                        </div>
                    ))}
                    <button onClick={addSelectField} className="add-button">
                        Add more
                    </button>
                </div>
                <div className="gig_info_stage_form_cont">
                    <p>Preferred music type:</p>
                    <label htmlFor="covers" className={`gig_info_stage_form_radio_input_label radio_option_1 ${formData.selectedValue === 'covers' ? 'radio_clicked' : ''}`}>
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
                    <label htmlFor="originals" className={`gig_info_stage_form_radio_input_label radio_option_2 ${formData.selectedValue === 'originals' ? 'radio_clicked' : ''}`}>
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
                    <label htmlFor="both" className={`gig_info_stage_form_radio_input_label radio_option_2 ${formData.selectedValue === 'both' ? 'radio_clicked' : ''}`}>
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
                    <TimeInput label="Musician Arrival Time" selectedTime={formData.musicianArrivalTime} setSelectedTime={(time) => handleInputChange({ target: { name: 'musicianArrivalTime', value: time } })} maxHour={23} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <TimeInput label="Gig Start Time" selectedTime={formData.gigStartTime} setSelectedTime={(time) => handleInputChange({ target: { name: 'gigStartTime', value: time } })} maxHour={23} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <TimeInput label="Gig Duration" selectedTime={formData.gigDuration} setSelectedTime={(time) => handleInputChange({ target: { name: 'gigDuration', value: time } })} maxHour={10} />
                </div>
                <div className="gig_info_stage_form_cont">
                    <label htmlFor="guide_fee" className='gig_info_stage_form_label'>Guide Fee:</label>
                    <div className="gig_info_stage_form_monetary_input_container">
                        <span>£</span>
                        <input
                        type="text"
                        id="guide_fee"
                        name="guideFee"
                        className="gig_info_stage_form_input"
                        value={formData.guideFee}
                        onChange={handleInputChange}
                        />
                        </div>
                </div>
                <div className="gig_info_stage_form_cont">
                    <label htmlFor="description" className='gig_info_stage_form_label'>Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="gig_info_stage_form_input"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Write any extra detail about the gig such as:
                                    - More details on the type of music
                                    - In-house equipment / what the musician may need to bring
                                    - Time of arrival / load in for musicians
                                    - Specific directions/parking information etc"
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </section>
    )
}


export function ViewConfirmStage() {
    return (
        <h1>view / confirm stage</h1>
    )
}