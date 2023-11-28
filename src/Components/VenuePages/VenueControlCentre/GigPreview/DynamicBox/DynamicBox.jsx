import React, { useState } from 'react';
import Details from './Tabs/Details';
import Applications from './Tabs/Applications';
import Payment from './Tabs/Payment';
import RatingsAndReviews from './Tabs/Ratings&Reviews';
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
                    <Details 
                        gigData={gigData}
                    />
                )}
                {selectedTab === 'Applications' && (
                    <Applications 
                        gigApplications={gigData.gigApplications}
                    />
                )}
                {selectedTab === 'Payment' && (
                    <Payment />
                )}
                {selectedTab === 'Ratings and Reviews' && (
                    <RatingsAndReviews />
                )}
            </div>
        </section>
    );
}