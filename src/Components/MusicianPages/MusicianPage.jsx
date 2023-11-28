import { Outlet } from "react-router-dom"
import Header from "../Other/Header"

export default function MusicianPage() {

    const userID = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userAddress = {
        address1: sessionStorage.getItem('userAddress1'),
        city: sessionStorage.getItem('userCity'),
        country: sessionStorage.getItem('userCountry'),
        postCode: sessionStorage.getItem('userPostCode'),
    };

    return (
        <>
            <Header />
            {userID ? (
                <Outlet context={{ userID: userID, userName: userName, userAddress: userAddress }} />
            ) : (
                <h1>Oops, you must be signed in to access the musician control centre.</h1>
            )}
        </>
    )
}