import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./TopNav.css";
import Wishlist from "../Wishlist/Wishlist";
import ts from "../../Images/tsk.png";
import CitySearch from "./CitySearch";

const TopNav = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // Add this state
console.log("selected location",selectedLocation)
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalOpen(false); // Close the modal after selecting a location
  };
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    setIsUserLoggedIn(!!userCookie);
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUserIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleHeartIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      openPopup();
    } else {
      alert("Please log in to add to wishlist.");
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <nav className="nav-containerbar">
      <div className="logo1">
        <Link to="/">
          <img
            className="logo11"
            src={ts}
            alt="Your Logo"
            onClick={() => navigate("/")}
          />
        </Link>
        {/* <div className="verbut">
          <button style={{ fontFamily: "Poppins" }}
            className="verifybtt"
            onClick={() => {
              window.open("http://43.204.148.111:8082/verification");
            }}
          >
            Verifier
          </button>
        </div> */}
      </div>
      {/* <div className="headsea">
        <input type="text" placeholder="Search" />
        <button>
          <FiSearch />
        </button>
      </div> */}
    <div className="style-0">
  <div className="style-1" onClick={handleModalOpen}>
    {selectedLocation ? (
      <>
        <p className="style-2">{truncateText(selectedLocation[0].formatted_address, 20)}</p>

      </>
    ) : (
      <p className="style-2">Select location</p>
    )}
    <svg
      className="style-3"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ExpandMoreIcon"
    >
      <path
        d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
        className="style-4"
      ></path>
    </svg>
  </div>  
</div>

  
    
       
      <div className="right-icons">
        <div
          onClick={handleUserIconClick} // Update the click event handler
          style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiUser />
        </div>
        <div
          // onMouseEnter={openPopup}
          onClick={handleHeartIconClick}
          style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiHeart />
        </div>
        <div
          onClick={() => navigate("/cart")}
          style={{ marginRight: "10px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiShoppingCart />
        </div>
      </div>
      
      {isPopupOpen && (
        <div className="popup" onMouseLeave={closePopup}>
          <Wishlist />
        </div>
      )}
 {isModalOpen && (
        <CitySearch onClose={handleModalClose} onSelectLocation={handleLocationSelect} />
      )}
       
    </nav>
  );
};

export default TopNav;
