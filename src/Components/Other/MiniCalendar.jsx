import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './mini_calendar.css'

export default function MiniCalendar({ onDateSelect }) {

    const handleDateClick = (arg) => {
        onDateSelect(arg.dateStr);
    }

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
        />
    )
}