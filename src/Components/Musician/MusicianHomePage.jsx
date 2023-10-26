import Header from "../Universal/Sections/Header"

export default function MusicianHomePage() {

    const userAlias = sessionStorage.getItem('Alias');

        return (
            <>
            <Header />
            {userAlias ? (<h1>Welcome, {userAlias}</h1>) : (<h1>Welcome to Gigin</h1>)}

            {userAlias ? (<p>This is the musicians page, where you can book gigs and check out your dashboard.</p>) : ''}
            
            </>
        )

}