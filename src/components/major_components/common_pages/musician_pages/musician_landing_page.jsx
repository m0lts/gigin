import TopBanner from "../../sections/top_banner"

export default function LandingPage() {

    const userForename = sessionStorage.getItem('Forename');
    const userSurname = sessionStorage.getItem('Surname');

        return (
            <>
            <TopBanner />
            {userForename && userSurname ? (<h1>Welcome, {userForename} {userSurname}</h1>) : (<h1>Welcome to Gigin</h1>)}
            
            </>
        )

}