import React, { useEffect, useState } from 'react';
import Details from './Tabs/Details';
import Applications from './Tabs/Applications';
import Payment from './Tabs/Payment';
import RatingsAndReviews from './Tabs/Ratings&Reviews';
import './dynamic_box.css'

export default function DynamicBox({ gigData }) {
    const [selectedTab, setSelectedTab] = useState('Gig Details');
    const [pastGig, setPastGig] = useState(false);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        const currentDateTime = new Date();
        const gigDate = new Date(gigData.gigDate.short + ' ' + gigData.gigStartTime);
        if (gigDate < currentDateTime) {
            setPastGig(true);
        }
    }, [])

    const userID = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');

    return (
        <section className="dynamic_box">
            {pastGig ? (
                <>
                    <nav className="nav">
                        <ul className="nav_ul">
                            <li className={`nav_li ${selectedTab === 'Gig Details' && 'active'}`} onClick={() => handleTabClick('Gig Details')}>Gig Details</li>
                            <li className={`nav_li ${selectedTab === 'Ratings and Reviews' && 'active'}`} onClick={() => handleTabClick('Ratings and Reviews')}>Rate the Venue</li>
                            <li className={`nav_li ${selectedTab === 'Payment' && 'active'}`} onClick={() => handleTabClick('Payment')}>Payment</li>
                        </ul>
                    </nav>
                    <div className="outlet">
                        {selectedTab === 'Gig Details' && (
                            <Details 
                            gigData={gigData}
                            />
                        )}
                        {selectedTab === 'Ratings and Reviews' && (
                            <RatingsAndReviews
                                musicianName={userName}
                                venueID={gigData.userID}
                            />
                        )}
                        {selectedTab === 'Payment' && (
                            <Payment />
                        )}
                    </div>
                </>
            ) : gigData.confirmedMusician === userID ? (
                <>
                    <nav className="nav">
                        <ul className="nav_ul">
                            <li className={`nav_li ${selectedTab === 'Gig Details' && 'active'}`} onClick={() => handleTabClick('Gig Details')}>Gig Details</li>
                            <li className={`nav_li ${selectedTab === 'Payment' && 'active'}`} onClick={() => handleTabClick('Payment')}>Payment</li>
                        </ul>
                    </nav>
                    <div className="outlet">
                        {selectedTab === 'Gig Details' && (
                            <Details 
                                gigData={gigData}
                            />
                        )}
                        {selectedTab === 'Payment' && (
                            <Payment />
                        )}
                        
                    </div>
                </>
            ) : (
                <>
                    <nav className="nav">
                        <ul className="nav_ul">
                            <li className={`nav_li ${selectedTab === 'Gig Details' && 'active'}`} onClick={() => handleTabClick('Gig Details')}>Gig Details</li>
                            <li className={`nav_li ${selectedTab === 'Applications' && 'active'}`} onClick={() => handleTabClick('Applications')}>Applications</li>
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
                                gigID={gigData._id}
                                setSelectedTab={setSelectedTab}
                                confirmedMusician={gigData.confirmedMusician}
                                venueID={gigData.userID}
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}