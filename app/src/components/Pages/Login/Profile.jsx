import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState("Freedy@gmail.com");
  const [mobileNumber, setMobileNumber] = useState("8776655409");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Perform save logic or API request here
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  return (
    <div className="Profilediv">
      <div className="Profilediv1">
        <div className="LeftSection">
          <div className="CenterContent">
            <div className="profile-img">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />
              )}
              <div
                className="file btn btn-lg btn-primary"
                style={{
                  marginLeft: "0px",
                  width: "130px",
                  height: "25px",
                  color: "white",
                }}
              >
                Change Photo
                <input type="file" name="file" onChange={handleImageChange} />
              </div>
              <br />
            </div>
            <div className="name-field">
              <h4 className="profile-name">Name</h4>
              <h4 className="profile-role">Usertype</h4>
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="profile-f1">
            <h4>Information</h4>
          </div>
          <hr className="line" />
          <div className="info-container">
            <div className="info-item">
              <h5 style={{ marginLeft: "-75px" }}>Email</h5>
              {isEditMode ? (
                <input
                  type="text"
                  className="email-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              ) : (
                <span className="email-input">{email}</span>
              )}
            </div>
            <div className="info-item">
              <h5 style={{ marginLeft: "-15px" }}>Mobile Number</h5>
              {isEditMode ? (
                <input
                  type="text"
                  className="mobile-input"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
              ) : (
                <span className="mobile-input">{mobileNumber}</span>
              )}
            </div>
          </div>
          <div className="edit-bbutton">
            {isEditMode ? (
              <button className="save-button" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <FaEdit className="edit-icon" onClick={handleEditClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
