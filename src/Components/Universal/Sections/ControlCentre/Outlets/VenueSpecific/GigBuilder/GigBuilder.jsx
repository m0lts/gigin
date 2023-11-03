import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useState } from 'react'
import { GigInfoStage, ViewConfirmStage } from './GigBuilderStages'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './gig_builder.css'

export default function GigBuilder() {

    // State for stage outlet logic
    const [buildStage, setBuildStage] = useState(0);
    const maxStage = 2
    const [nextButtonAvailable, setNextButtonAvailable] = useState(false);

    // State for calendar date selected
    const [dateSelected, setDateSelected] = useState();

    // Send date clicked to dateSelected state
    const handleDateClick = (arg) => {
        if (arg.dayEl && !arg.dayEl.classList.contains('fc-day-past')) {
          if (dateSelected && dateSelected.dateStr === arg.dateStr) {
            // Unselect the date if it's already selected
            setDateSelected(null);
            setNextButtonAvailable(false);
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
            setNextButtonAvailable(true);
            arg.dayEl.style.color = 'var(--gigin-orange)';
            arg.dayEl.style.fontWeight = 700;
          }
        }
      };


    // Array of components to render below
    const buildStages = [
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
        />,
        <GigInfoStage />,
        <ViewConfirmStage />
    ];

    // Next button click logic
    const handleNextButtonClick = () => {
        if (buildStage < maxStage && dateSelected) {
            setBuildStage(buildStage + 1);
        }
        
    };

    // Top progress bar logic
    const handlePreviousStageClick = (stage) => {
        if (stage < buildStage) {
            setBuildStage(stage);
        }
    }


    return (
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
                <div className='gig_builder_stages_outlet'>
                    {buildStages[buildStage]}
                </div>
                <div className='gig_builder_stages_next_button'>
                    {buildStage < maxStage && <button onClick={handleNextButtonClick} className={`next_button ${nextButtonAvailable === false && 'disabled'}`} >Next <FontAwesomeIcon icon={faArrowRightLong} /></button>}
                </div>
            </div>
        </section>
    )
}