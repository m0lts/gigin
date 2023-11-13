import { useState, useEffect } from 'react'
import './profile_editor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ProfileEditor() {

  const userID = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');

  const [profileData, setProfileData] = useState({
    userID: userID,
    userName: userName,
    profileTitle: '',
    profileFeatures: Array(3).fill(''),
    profileDescription: '',
    profilePicture: '',
  })

  // Image viewing func
  const [previews, setPreviews] = useState(null);
  
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setPreviews(e.target.result);
  
        setProfileData((prevProfileData) => {
          return {
            ...prevProfileData,
            profilePicture: e.target.result,
          };
        });
      };
  
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviews(null);
  
    setProfileData((prevProfileData) => {
      return {
        ...prevProfileData,
        profilePicture: null,
      };
    });
  
    const input = document.getElementById('profilePictureInput');
    if (input) {
      input.value = '';
    }
  };

  // HANDLE FORM VALUES AND SEND TO UPDATE VENUE PROFILE

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name.startsWith('feature')) {
        const featureNumber = parseInt(name.slice(-1), 10);
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          profileFeatures: prevProfileData.profileFeatures.map((feature, index) =>
            index === featureNumber - 1 ? value : feature
          ),
        }));
        } else {
          setProfileData((prevProfileData) => ({
            ...prevProfileData,
            [name]: value,
          }));
        }
  }

  const handleFormSubmission = async (event) => {
      event.preventDefault();

      try {
          const response = await fetch('/api/Profiles/VenueProfiles/UpdateVenueProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });

          if (response.status === 200) {
            console.log(response.message);
          } else if (response.status === 201) {
            console.log(response.message);
          } else {
            alert('Error submitting profile.')
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
  }

  // ON PAGE LOAD, RETRIEVE THE USER'S PROFILE DATA AND ASSIGN IT TO THE PROFILE STATE
  // SO THAT THE USER CAN SEE WHAT THEY HAVE PREVIOUSLY ENTERED INTO THEIR PROFILE

    useEffect(() => {
      fetchUserProfile();
    }, [])

    // FETCH USER PROFILE AND UPDATE profileData WITH THE VALUES
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/Profiles/VenueProfiles/FindVenueProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
        }),
      });

      if (response.status === 200) {
        const userData = await response.json();

        const updatedProfileData = {
          userID: userData.venueProfile.userID,
          profileTitle: userData.venueProfile.profileTitle || '',
          profileFeatures: userData.venueProfile.profileFeatures || Array(3).fill(''),
          profileDescription: userData.venueProfile.profileDescription || '',
        };

        setProfileData(updatedProfileData);

        if (userData.venueProfile.profilePicture) {
          setPreviews(userData.venueProfile.profilePicture);
        }
      } else {
        console.error('Failed to fetch user profile data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  };

return (
    <>
    <h1 className="controlcentre_section_header">Profile Editor</h1>
    <div className="controlcentre_section_body profile_editor">
      <div className="profile_editor_top">
        <h1>{userName}</h1>
      </div>
      <form action="" className="profile_editor_middle">
        <div className="profile_editor_image_container">
          <FontAwesomeIcon icon={faEdit} className='edit_icons' />
          {!previews && (
            <>
              <label htmlFor="profilePictureInput" className="profile_editor_insert_image_label">
                <FontAwesomeIcon icon={faImage} className='image_icon'/>
                Insert Image
              </label>
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={(event) => handleImageChange(event)}
              />
            </>
          )}
          {previews && (
            <>
              <img
                src={previews}
                alt="Preview"
                className="profile_editor_preview_image"
                onClick={handleRemoveImage}
              />
            </>
          )}
        </div>
        <div className='profile_editor_input_cont'>
        <FontAwesomeIcon icon={faEdit} className='edit_icons' />
          <input 
              type="text" 
              name="profileTitle" 
              id="profileTitle" 
              value={profileData.profileTitle}
              placeholder="Write a short summary of your venue..."
              onChange={handleInputChange}
          />
        </div>
          <div className="profile_editor_key_features profile_editor_input_cont">
            <FontAwesomeIcon icon={faEdit} className='edit_icons' />
            {profileData.profileFeatures.map((feature, index) => (
              <input
                key={index}
                type="text"
                name={`feature${index + 1}`}
                id={`feature${index + 1}`}
                placeholder={`Key feature ${index + 1}`}
                value={feature}
                onChange={handleInputChange}
              />
            ))}
          </div>
          <div className='profile_editor_input_cont'>
            <FontAwesomeIcon icon={faEdit} className='edit_icons' />
            <textarea 
                name="profileDescription" 
                id="profileDescription" 
                value={profileData.profileDescription}
                placeholder="Describe your venue as well as possible. Musicians will read this description."
                onChange={handleInputChange}
            />
          </div>
          <button onClick={handleFormSubmission}>Save</button>
        </form>
      </div>
    </>
  )
}