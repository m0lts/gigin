import TopBanner from "../../sections/top_banner"

export default function MusicianLandingPage() {

    const userAlias = sessionStorage.getItem('Alias');

        return (
            <>
            <TopBanner />
            {userAlias ? (<h1>Welcome, {userAlias}</h1>) : (<h1>Welcome to Gigin</h1>)}

            {userAlias ? (<p>This is the musicians page, where you can book gigs and check out your dashboard.</p>) : ''}
            
            </>
        )

}