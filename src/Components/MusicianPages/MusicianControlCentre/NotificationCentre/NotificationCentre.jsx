import { useState } from "react"

export default function NotificationCentre() {

    const [notifications, setNotifications] = useState(false)

    return (
        <>
        <h1 className="controlcentre_section_header">Notification Centre</h1>
        <div className="controlcentre_section_body">
            {notifications ? (
                <h1>Notification</h1>
            ) : (
                <div className='loading_modal'>
                    <div className="loader"></div>
                        <div className="loading_modal_message">
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}