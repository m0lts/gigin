export default function UserTypeFilter({ signUpData, setSignUpData }) {

    const handleRadioChange = (event) => {
        setSignUpData({
          ...signUpData,
          userType: event.target.value,
        });
    };

    return (
        <div className="signup_page_filter_cont">
            <p className="signup_page_filter_question">I'm a:</p>
            <div className="signup_page_flex_cont">
                <label htmlFor="musician" className={`signup_page_radio_labels ${signUpData.userType === 'musician' ? 'radio_clicked' : ''}`}>
                    <input 
                    type="radio" 
                    id="musician" 
                    name="radio_select" 
                    value="musician" 
                    required={true}
                    className="signup_page_radio_inputs"
                    // checked={userType === 'musician'} 
                    onChange={handleRadioChange} 
                    />
                    Musician
                </label>
                <label htmlFor="venue" className={`signup_page_radio_labels ${signUpData.userType === 'venue' ? 'radio_clicked' : ''}`}>
                    <input 
                    type="radio" 
                    id="venue" 
                    name="radio_select" 
                    value="venue" 
                    required={true}
                    className="signup_page_radio_inputs" 
                    // checked={userType === 'venue'} 
                    onChange={handleRadioChange} 
                    />
                    Venue
                </label>
                <label htmlFor="promoter" className={`signup_page_radio_labels ${signUpData.userType === 'promoter' ? 'radio_clicked' : ''}`}>
                    <input 
                    type="radio" 
                    id="promoter" 
                    name="radio_select" 
                    value="promoter" 
                    required={true}
                    className="signup_page_radio_inputs" 
                    // checked={userType === 'promoter'} 
                    onChange={handleRadioChange} 
                    />
                    Promoter
                </label>
                <label htmlFor="gig-goer" className={`signup_page_radio_labels ${signUpData.userType === 'gig-goer' ? 'radio_clicked' : ''}`}>
                    <input 
                    type="radio" 
                    id="gig-goer" 
                    name="radio_select" 
                    value="gig-goer" 
                    required={true}
                    className="signup_page_radio_inputs" 
                    // checked={userType === 'gig-goer'} 
                    onChange={handleRadioChange} 
                    />
                    Gig-goer
                </label>
            </div>
        </div>
    )
}