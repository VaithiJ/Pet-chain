import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import doggy from "../../Images/doggo.gif"

import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import NVmenu from "../../Reusables/NV/NBmenu";

const Marketplacee = (props) => {
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

  const {breed} = useParams()
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
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
    navigate(`/description/${id}`);
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
    console.log(breed)
    const fetchData = async () => {
      try {
        const response = await axios.get(`/petBreed/${breed}`);
        console.log(response)
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

    if (selectedLocation && pet.location !== selectedLocation) {
      return false;
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
          <img className="dogwalk" src={doggy}/>

          <div className="lineline"></div>
          <div className="linelinee"></div>
          <div className="containerrr">
            <div>
              <div
                style={{ marginTop: "20px", height: "690px" }}
              >
                {/* <div className="range-wrapper" style={{ position: "sticky" }}>
                  <h2 className="range-title">Filters</h2>

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
                    <select
                      className="year-dropdown"
                      value={selectedLocation}
                      onChange={handleLocationChange}
                    >
                      <option value="">All Locations</option>
                      {daata.map((pet) => (
                        <option key={pet._id} value={pet.location}>
                          {pet.location}
                        </option>
                      ))}
                    </select>
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
                  </div> */}
                {/* </div> */}

                <div className="pettttt-card">
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
                            src={pet.imageUrl}
                            alt={pet.name}
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
    </>
  );
};

export default Marketplacee;
