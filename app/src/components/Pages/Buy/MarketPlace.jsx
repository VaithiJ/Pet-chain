import React, { useState, useEffect, useMemo, useRef } from "react";
import "./Marketplace.css";
import { Link, useNavigate } from "react-router-dom";
import { Range } from "react-range";
import NavBar from "../../Reusables/NavBar/NavBar.js";
import goldy from "../../Images/goldy.jpg";
import catGif from "../../Images/cat.gif";
import Sidebar from "../../Reusables/Sidebar/Sidebar.jsx";
import Sellitem from "../Seller/Sellitem";
import axios from "../../../url.js";
import black from "../../Images/black.jpg";
import check from "../../Images/check.png";
import doggy from "../../Images/doggo.gif"
import ScrollToTopButton from "../../Reusables/Arrow/Arrow";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaHeart, FaFilter } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import NVmenu from "../../Reusables/NV/NBmenu";



const Marketplace = (props) => {
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [selectedYear, setSelectedYear] = useState("");
  const [transmission, setTransmission] = useState([]);
  const [iswishListed, setwishList] = useState({});
  const [loading, setLoading] = useState(true);
  const [daata, setDaata] = useState([]);
  const [petsId, setPetsId] = useState([]);
  const [daaata, setDaaata] = useState([]);
  const [hoveredPet, setHoveredPet] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userSelectedLocation, setUserSelectedLocation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const inputRef = useRef();
  const [location, setLocation] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const libraries = ["places"];







  const center = useMemo(() =>({lat:13.0300, lng: 80.2421}),[])

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };
  

  const navigate = useNavigate();

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };
  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleFavoriteClick = async (petId) => {
    try {
      const response = await axios.get(`/wishlist/${petId}`);
      const updatedWishList = {
        ...iswishListed,
        [petId]: true,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  

  const descript = (id) => {
    // navigate(`/description/${id}`);
    window.location.href = `description/${id}`;

  };

  const handleFavoriteRemove = async (petId) => {
    try {
      const response = await axios.get(`/removewishlist/${petId}`);
      const updatedWishList = {
        ...iswishListed,
        [petId]: false,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        console.log(response.data.pets)
        const filteredPets = response.data.pets.filter((pet) => pet.price > 0);
        setDaata(filteredPets);
        const petIds = filteredPets.map((pet) => pet._id);
        setPetsId(petIds);

        try {
          const responsee = await axios.get(`/image/${petIds}`);
          const updatedDaata = daata.map((pet) => ({
            ...pet,
            imageUrl:
              responsee.data.find((data) => data._id === pet._id)?.imageUrl ||
              null,
          }));
          setDaaata(updatedDaata);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handlePlaceChange = async() => {
    const place = inputRef.current.getPlaces();
    if (place && place.length > 0) {
      const selectedPlace = place[0];
      console.log(selectedPlace.formatted_address);
      setLocation(selectedPlace.formatted_address);
      setLatitude(selectedPlace.geometry.location.lat())
      setLongitude(selectedPlace.geometry.location.lng())
      console.log(selectedPlace.geometry.location.lat());
      console.log(selectedPlace.geometry.location.lng());
      handleSelectLocation(selectedPlace); // Call the handleSelectLocation function in Sellitem with the selected place
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allwishlist");
        const wishlistedPets = response.data.pets;
        
        // Create an object to store the wishlisted status of each pet
        const updatedWishList = {};
        wishlistedPets.forEach((pet) => {
          updatedWishList[pet._id] = pet.isWishlisted === "wishlisted";
        });

        // Update the iswishListed state with the new data
        setwishList(updatedWishList);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();

    
  
    // Set interval to call the fetchData function every 1 second
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
  
    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setwishList(JSON.parse(storedWishList));
    }
  }, []);

 const filteredPets = daata.filter((pet) => {
  const price = pet.price;

  if (price < priceRange[0] || price > priceRange[1]) {
    return false;
  }

  if (selectedYear && pet.age !== selectedYear) {
    return false;
  }

  if (selectedGender && pet.gender !== selectedGender) {
    return false;
  }

  if (selectedBreed && pet.breed !== selectedBreed) {
    return false;
  }

  if (location) {
    const locationParts = location.split(", ");
    const locationLength = locationParts.length;

    // Check for country
    const country = locationParts[locationLength - 1];
    if (country && pet.country !== country) {
      return false;
    }

    // Check for state
    const state = locationParts[locationLength - 2];
    if (state && pet.state !== state) {
      return false;
    }

    // Check for city
    const city = locationParts[locationLength - 3];
    if (city && pet.city !== city) {
      return false;
    }
  }

  if (
    searchInput &&
    !pet.category.toLowerCase().includes(searchInput.toLowerCase())
  ) {
    return false;
  }

  return true;
});

  

  const handleMouseEnter = (petId) => {
    setHoveredPet(petId);
  };

  const handleMouseLeave = () => {
    setHoveredPet(null);
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <img style={{ marginTop: "200px" }} src={catGif} alt="Loader" />
        </div>
      ) : (
        <>
          <NVmenu />
          <p className="extr">View and Buy all your favourite pets</p>
          <div>
      
            <img className="dogwalk" src={doggy}/>

          <div className="lineline"></div>
          <div className="linelinee"></div>
          <div className="rads" >
          <div className="filter-toggle">
          {/* <button
  className="toggle-button"
  onClick={() => setShowFilterPopup(!showFilterPopup)}
>
  {showFilterPopup ? "Hide Filters" : "Show Filters"}
</button> */}
<div className="filter-toggle">
  <button
    className={`toggle-button ${showFilterPopup ? "active" : ""}`}
    onClick={() => setShowFilterPopup(!showFilterPopup)}
  >
    <FaFilter className="filter-icon"  />
    <div style={{fontSize:"20px"}}>Filter</div>
  </button>
</div>

    </div>
          <div className="containeeeerr">
        
            <div>
            {showFilterPopup && (
                                <div className={`filter-popup ${showFilterPopup ? "" : "hidden"}`}>

              <div
                className="range-container"
              >
                <div className="range-wrapper" style={{ position: "sticky" }}>
                  <h2 className="range-title1" >Filters  <span className="close-icon" onClick={() => setShowFilterPopup(false)}>
    &#x2715;
  </span></h2>

                  <h2 className="range-title" style={{ textAlign: "left" }}>
                    Price Range
                  </h2>
                  <p className="range-values">
                    <span>{formatAmount(priceRange[0])}</span>
                    <span>{formatAmount(priceRange[1])}</span>
                  </p>

                  <Range
                    step={1000}
                    min={1000}
                    max={100000}
                    values={priceRange}
                    onChange={handlePriceRangeChange}
                    renderTrack={({ props, children }) => (
                      <div {...props} className="range-track">
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        className={`range-thumb ${isDragged ? "dragged" : ""}`}
                      />
                    )}
                  />

                  <p>
                    <span className="dot">Min</span>
                    <span className="value">Max</span>
                  </p>

                  <div
                    className="search-container"
                    style={{ textAlign: "left" }}
                  >
                    <p className="search-title">Type</p>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Search..."
                      onChange={handleSearchInputChange}
                    />
                    <AiOutlineSearch className="search-icon" />
                    <p className="top-brands">Breed</p>
                    <select
                      className="year-dropdown"
                      value={selectedBreed}
                      onChange={handleBreedChange}
                    >
                      <option value="">All Breeds</option>

                      {daata.map((pet) => (
                        <option key={pet._id} value={pet.breed}>
                          {pet.breed}
                        </option>
                      ))}
                    </select>
                                      <p className="top-brands">Location</p>
                   
                             <LoadScript googleMapsApiKey="AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE"           libraries={libraries}
>
          <div className="city1">
            <div className="container12">
            </div>
            <div className="search-popup">
              <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChange}>
                <input type="text" className="search-input1" style={{width:"280px",height:"40px", position:"relative", left:"-10px", top:"1px"}} placeholder="Search city" name="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}/>
              </StandaloneSearchBox>
            </div>
          </div>
          {/* <GoogleMap
  zoom={10}
  center={center}
  mapContainerStyle={{ width: "100%", height: "400px" }}
  onClick={(event) => setUserSelectedLocation(event.latLng.toJSON())}
>
  {userSelectedLocation && (
    <Marker position={userSelectedLocation} />
  )}
</GoogleMap> */}
        </LoadScript>
                  </div>

                  <div className="radio-group" style={{ textAlign: "left" }}>
                    <p className="top-brands">Gender</p>

                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={selectedGender === "male"}
                        onChange={handleGenderChange}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={selectedGender === "female"}
                        onChange={handleGenderChange}
                      />{" "}
                      Female
                    </label>
                  </div>

                  <div className="year-container" style={{ textAlign: "left" }}>
                    <p className="year-title">Age</p>

                    <select
                      className="year-dropdown"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      <option value="">All Years</option>
                      <option value="puppy">Puppy</option>
                      <option value="adult">Adult</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>
                </div>

                
              </div>
              </div>
            )}
            </div>
          </div>
          <div className="petc">
          <div className="pettt-card">
                  {Array.isArray(filteredPets) && filteredPets.length > 0 ? (
                    filteredPets.map((pet, index) => (
                      <div
                        key={pet._id}
                        className="car-card"
                        style={{ marginTop: "-33px", marginLeft: "-10px" }}
                        onMouseEnter={() => handleMouseEnter(pet._id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div>
                          <div
                            className="favorite-icon"
                            style={{
                              position: "relative",
                              zIndex: "3",
                              top: "18px",
                              cursor: "grabbing",
                            }}
                          >
                           {iswishListed[pet._id] ? (
                    <FaHeart
                      style={{ color: "red" }}
                      className="heart-icon"
                      onClick={() => handleFavoriteRemove(pet._id)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="heart-icon"
                      style={{ color: "white" }}
                      onClick={() => handleFavoriteClick(pet._id)}
                    />
                  )}
                          </div>
                          {pet.verifyStatus === "verified" && (
                            <img
                              src={check}
                              className="check-icon"
                              alt="Check"
                            />
                          )}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                            }}
                          >
                            {/* <p className="pet-name">{pet.name}</p>
                            <p className="pet-details">{pet.breed}</p>
                            <p className="pet-details">
                              {formatAmount(pet.price)}
                            </p> */}
                          </div>
                          <img
                            className="car-image"
                            style={{
                              width: "260px",
                              height: "360px",
                              position: "relative",
                            }}
                            onClick={() => descript(pet._id)}
                            src={pet.imageUrl[0]}
                            alt="Nil"
                          />
                          {hoveredPet === pet._id && (
                            <div
                              className="popup"
                              onClick={() => descript(pet._id)}
                            >
                              <div className="asdf">
                                <p
                                  className="pet-name"
                                  style={{
                                    color: "white",
                                    fontFamily: "Nunito",
                                    position: "relative",
                                  }}
                                >
                                  {pet.name}
                                </p>
                                <p
                                  className="pet-details"
                                  style={{
                                    color: "white",
                                    fontFamily: "Nunito",
                                    position: "relative",
                                  }}
                                >
                                  {pet.breed}
                                </p>
                                <p
                                  className="pet-details"
                                  style={{
                                    color: "white",
                                    fontFamily: "Nunito",
                                    position: "relative",
                                  }}
                                >
                                  {formatAmount(pet.price)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        position: "relative",
                        top: "-600px",
                        left: "600px",
                        fontSize: "40px",
                        fontFamily: "Nunito",
                        width: "340px",
                        backgroundColor: "red",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      No pets found
                    </p>
                  )}
                </div>
                </div>
                </div>
                </div>
        </>
      )}
      <ScrollToTopButton/>
    </>
  );
};

export default Marketplace;
