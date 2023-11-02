import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './gig_builder.css'

export default function GigBuilder() {

    const handleDateClick = (arg) => {
        console.log(arg);
        arg.dayEl.style.backgroundColor = 'red';
    }

    return (
        <section className="gig_builder">
            <ol className="gig_builder_progress">
                <li className="gig_builder_progress_item">
                    Select a Date
                </li>
                <li className="gig_builder_progress_item">
                    Gig Info
                </li>
                <li className="gig_builder_progress_item">
                    View and Confirm
                </li>
            </ol>
            <div className="gig_builder_stages">
                <h2 className="gig_builder_stage_title">On which day do you want to host a gig?</h2>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    dateClick={handleDateClick}
                    initialView="dayGridMonth"
                />
            </div>
        </section>
    )
}