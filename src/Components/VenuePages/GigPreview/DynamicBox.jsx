import React, { useState } from 'react';
import './dynamic_box.css'

export default function DynamicBox({ gigData }) {
    const [selectedTab, setSelectedTab] = useState('Gig Details');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <section className="dynamic_box">
            <nav className="nav">
                <ul className="nav_ul">
                    <li className={`nav_li ${selectedTab === 'Gig Details' && 'active'}`} onClick={() => handleTabClick('Gig Details')}>Gig Details</li>
                    <li className={`nav_li ${selectedTab === 'Applications' && 'active'}`} onClick={() => handleTabClick('Applications')}>Applications</li>
                    <li className={`nav_li ${selectedTab === 'Payment' && 'active'}`} onClick={() => handleTabClick('Payment')}>Payment</li>
                    <li className={`nav_li ${selectedTab === 'Ratings and Reviews' && 'active'}`} onClick={() => handleTabClick('Ratings and Reviews')}>Ratings and Reviews</li>
                </ul>
            </nav>
            <div className="outlet">
                {selectedTab === 'Gig Details' && (
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
                )}
                {selectedTab === 'Applications' && (
                    <>
                        {gigData.gigApplications.map((musician, index) => (
                            <p key={index}>{musician}</p>
                        ))}
                    </>
                )}
                {selectedTab === 'Payment' && (
                    <h1>Payment content goes here</h1>
                )}
                {selectedTab === 'Ratings and Reviews' && (
                    <h1>Ratings and Reviews content goes here</h1>
                )}
            </div>
        </section>
    );
}