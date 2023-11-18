import { Outlet } from "react-router-dom"
import Header from "../Other/Header"

export default function VenuePage() {

    const userID = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userAddress = sessionStorage.getItem('userAddress');

    return (
        <>
            <Header />
            {userID ? (
                <Outlet context={{ userID: userID, userName: userName, userAddress: userAddress }} />
            ) : (
                <h1>Oops, you must be signed in to access the venue control centre.</h1>
            )}
        </>
    )
}