import { useState } from 'react'
import './profile_editor.css'

export default function ProfileEditor() {

  return (
    <h1>Profile editor</h1>
  )

    // const [formData, setFormData] = useState({
    //     venueName: venueName,
    //     venueAddress: venueAddress,
    //     summary: '',
    //     keyFeatures: {
    //     keyFeature1: '',
    //     keyFeature2: '',
    //     keyFeature3: '',
    //     },
    //     venueDescription: '',
    //     profilePictures: Array(5).fill(null),
    // })

    // // Image viewing func
    // const [previews, setPreviews] = useState(Array(5).fill(null));
    
    // const handleImageChange = (event, index) => {
    //     const selectedFile = event.target.files[0];
    
    //     if (selectedFile) {
    //       const reader = new FileReader();
    
    //       reader.onload = (e) => {
    //         setPreviews((prevPreviews) => {
    //           const newPreviews = [...prevPreviews];
    //           newPreviews[index] = e.target.result;
    //           return newPreviews;
    //         });
    
    //         setFormData((prevFormData) => {
    //           const newProfilePictures = [...prevFormData.profilePictures];
    //           newProfilePictures[index] = e.target.result;
    //           return {
    //             ...prevFormData,
    //             profilePictures: newProfilePictures,
    //           };
    //         });
    //       };
    
    //       reader.readAsDataURL(selectedFile);
    //     }
    //   };

    //     const handleRemoveImage = (index) => {
    //     setPreviews((prevPreviews) => {
    //         const newPreviews = [...prevPreviews];
    //         newPreviews[index] = null;
    //         return newPreviews;
    //     });

    //     setFormData((prevFormData) => {
    //         const newProfilePictures = [...prevFormData.profilePictures];
    //         newProfilePictures[index] = null;
    //         return {
    //         ...prevFormData,
    //         profilePictures: newProfilePictures,
    //         };
    //     });

    //     const input = document.getElementById(`profilePictureInput${index}`);
    //     if (input) {
    //         input.value = '';
    //     }
    //     };


    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     if (name.startsWith('keyFeature')) {
    //         const keyFeatureNumber = name.slice(-1);
    //         setFormData((prevFormData) => ({
    //           ...prevFormData,
    //           keyFeatures: {
    //             ...prevFormData.keyFeatures,
    //             [`keyFeature${keyFeatureNumber}`]: value,
    //           },
    //         }));
    //       } else {
    //         setFormData((prevFormData) => ({
    //           ...prevFormData,
    //           [name]: value,
    //         }));
    //       }
    // }

    // const handleFormSubmission = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const response = await fetch('/api/Gigs/UpdateVenueProfile.js', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(formData),
    //         });
      
    //         // Handle relative responses and edit modal message.
    //         if (response.ok) {
    //             console.log('data added to database')
    //           }
    //       } catch (error) {
    //         console.error('Error submitting form:', error);
    //       }
    // }

    // return (
    //     <>
    //     <h1 className="controlcentre_section_header">Profile Editor</h1>
    //     <div className="controlcentre_section_body profile_editor">
    //         <div className="profile_editor_top">
    //             <h1>Hello</h1>
    //         </div>
    //         <form action="" className="profile_editor_middle">
    //         {Array.from({ length: 5 }, (_, index) => (
    //         <div key={index} className="profile_editor_img_section">
    //           <div className="profile_editor_image_container">
    //             {!previews[index] && (
    //               <>
    //                 <label htmlFor={`profilePictureInput${index}`} className="profile_editor_insert_image_label">
    //                   Insert Image {index + 1}
    //                 </label>
    //                 <input
    //                   type="file"
    //                   id={`profilePictureInput${index}`}
    //                   accept="image/*"
    //                   onChange={(event) => handleImageChange(event, index)}
    //                 />
    //               </>
    //             )}
    //             {previews[index] && (
    //               <>
    //                 <img
    //                   src={previews[index]}
    //                   alt={`Preview ${index + 1}`}
    //                   className="profile_editor_preview_image"
    //                   onClick={() => handleRemoveImage(index)}
    //                 />
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //             <div className="profile_editor_text_section">
    //                 <input 
    //                     type="text" 
    //                     name="summary" 
    //                     id="summary" 
    //                     placeholder="Write a short summary of your venue..."
    //                     onChange={handleInputChange}
    //                 />
    //                 <div className="profile_editor_key_features">
    //                     <input 
    //                         type="text" 
    //                         name="keyFeature1" 
    //                         id="keyFeature1" 
    //                         placeholder="Key feature 1"
    //                         onChange={handleInputChange}
    //                     />
    //                     <input 
    //                         type="text" 
    //                         name="keyFeature2" 
    //                         id="keyFeature2" 
    //                         placeholder="Key feature 2"
    //                         onChange={handleInputChange}
    //                     />
    //                     <input 
    //                         type="text" 
    //                         name="keyFeature3" 
    //                         id="keyFeature3" 
    //                         placeholder="Key feature 3"
    //                         onChange={handleInputChange}
    //                     />
    //                 </div>
    //                 <textarea 
    //                     name="venueDescription" 
    //                     id="venueDescription" 
    //                     placeholder="Describe your venue as well as possible. Musicians will read this description."
    //                     onChange={handleInputChange}
    //                 />
    //             </div>
    //             <button onClick={handleFormSubmission}>Save</button>
                
    //         </form>
    //     </div>
    //     </>
    // )
}