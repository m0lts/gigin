export default function Details({ gigData }) {
    return (
        <>
            <h5>{gigData.gigAddress.address1}</h5>
            <h5>{gigData.gigAddress.city}</h5>
            <h5>{gigData.gigAddress.country}</h5>
            <h5>{gigData.gigAddress.postCode}</h5>
            <ul>
                <li>Genres:</li>
                {gigData.gigGenres.map((genre, index) => (
                    <li key={index}>
                        {genre}
                    </li>
                ))}
            </ul>
            <p>Music Type: {gigData.gigMusicType}</p>
            <p>Musician arrival time: {gigData.gigArrivalTime}</p>
            <p>Extra Information: {gigData.gigExtraInformation}</p>
        </>
    )
}