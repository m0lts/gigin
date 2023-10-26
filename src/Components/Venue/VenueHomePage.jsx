import Header from "../Universal/Sections/Header"

export default function VenueHomePage() {

    const userAlias = sessionStorage.getItem('Alias');

    return (
        <>
        <Header />
        {userAlias ? (<h1>Welcome, {userAlias}</h1>) : (<h1>Welcome to Gigin</h1>)}

        <p>This is the venue page, where you can publish gigs for musicians to apply to.</p>
        
        </>
    )

}