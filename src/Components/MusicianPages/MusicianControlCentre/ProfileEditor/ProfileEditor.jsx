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


  // Handle form values and fillings
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

  // Handle form submission
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleFormSubmission = async (event) => {
      event.preventDefault();
      setSubmitting(true);
      setSubmissionMessage('Updating profile...');
      try {
          const response = await fetch('/api/Profiles/MusicianProfiles/UpdateMusicianProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });

          if (response.status === 200) {
            setSubmissionMessage('Successfully uploaded new profile.')
            setTimeout(() => {
              setSubmitting(false);
              setSubmissionMessage('');
            }, 2000)
          } else if (response.status === 201) {
            setSubmissionMessage('Profile updated successfully.')
            setTimeout(() => {
              setSubmitting(false);
              setSubmissionMessage('');
            }, 2000)
          } else {
            setSubmissionMessage('Error uploading profile.')
            setTimeout(() => {
              setSubmitting(false);
              setSubmissionMessage('');
            }, 2000)
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
  }

  // Retrieve the user's profile data (if already created a profile), and fill profileData values in with database values
  useEffect(() => {
    fetchUserProfile();
  }, [])
  const fetchUserProfile = async () => {
    setSubmitting(true);
    setSubmissionMessage('Loading...');
    try {
      const response = await fetch('/api/Profiles/MusicianProfiles/FindMusicianProfile', {
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
          userID: userData.musicianProfile.userID,
          profileTitle: userData.musicianProfile.profileTitle || '',
          profileFeatures: userData.musicianProfile.profileFeatures || Array(3).fill(''),
          profileDescription: userData.musicianProfile.profileDescription || '',
        };
        setProfileData(updatedProfileData);
        if (userData.musicianProfile.profilePicture) {
          setPreviews(userData.musicianProfile.profilePicture);
        }
        setSubmitting(false);
        setSubmissionMessage('');
      } else {
        setSubmissionMessage('Error retrieving profile data.')
        setTimeout(() => {
          setSubmitting(false);
          setSubmissionMessage('');
        }, 2000)
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  };


return (
    <>
    <h1 className="controlcentre_section_header">Profile Editor</h1>
    <div className="controlcentre_section_body profile_editor">
      {submitting && 
      <div className='loading_modal'>
        <div className="loader"></div>
        <div className="loading_modal_message">
          <p>{submissionMessage}</p>
        </div>
      </div>
      }
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
              placeholder="Write a short summary of yourself / your band..."
              onChange={handleInputChange}
          />
        </div>
          <div className="profile_editor_key_features profile_editor_input_cont">
            {profileData.profileFeatures.map((feature, index) => (
              <div className='profile_editor_input_cont' key={index} >
              <FontAwesomeIcon icon={faEdit} className='edit_icons' />
              <input
                type="text"
                name={`feature${index + 1}`}
                id={`feature${index + 1}`}
                placeholder={`Key feature ${index + 1}`}
                value={feature}
                onChange={handleInputChange}
              />
              </div>
            ))}
          </div>
          <div className='profile_editor_input_cont'>
            <FontAwesomeIcon icon={faEdit} className='edit_icons' />
            <textarea 
                name="profileDescription" 
                id="profileDescription" 
                value={profileData.profileDescription}
                placeholder="Describe yourself / your band as well as possible. Venues will read this description."
                onChange={handleInputChange}
            />
          </div>
          <button className='btn' onClick={handleFormSubmission}>Save</button>
        </form>
      </div>
    </>
  )
}