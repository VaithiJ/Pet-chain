import React, { useState , useEffect} from "react";
import "./Adopt.css"
import { Link, useNavigate } from "react-router-dom";
import { Range } from "react-range";
import NavBar from "../../Reusables/NavBar/NavBar.js";
import goldy from "../../Images/goldy.jpg";
import catGif from '../../Images/cat.gif'
import axios from '../../../url'

import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import NVmenu from "../../Reusables/NV/NBmenu";

const Adopt = () => {
  const [priceRange, setPriceRange] = useState([5000, 500000]);
  const [selectedYear, setSelectedYear] = useState("");
  const [transmission, setTransmission] = useState([]);
  const [iswishListed, setwishList] = useState(false);
  const [loading, setLoading] = useState(true);

  const [daata, setDaata] = useState('');

const navigate = useNavigate();
  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleFavoriteClick = () => {
    setwishList(!iswishListed);
  };

  const handleFavoriteRemove = () => {
    setwishList(!iswishListed);
  };
  const handleSearchInputChange = (event) => {};

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const consoleee = () =>{
    console.log(daata)
  }


  const descript=(id) =>{
    navigate(`/description/${id}`)
  }
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
        console.log(response.data.pets);
        const filteredPets = response.data.pets.filter((pet) => pet.price == 0);
        console.log(filteredPets)
        setDaata(filteredPets);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <>
    {loading ? (
      <div className="loader">
        <img style={{marginTop:"200px"}} src={catGif} alt="Loader" />
      </div>
    ) : (
      <>
      <NVmenu />

      <div className="container">
        <div className="range-container">
          <div className="range-wrapper">
            <h1 className="range-title">Adoption is Free!</h1>

           

           
            <div className="radio-group">
              <p className="top-brands">Gender</p>

              <label>
                <input type="radio" name="gender" value="male" /> Male
              </label>
              <label>
                <input
                  style={{ marginLeft: "20px" }}
                  type="radio"
                  name="gender"
                  value="female"
                />{" "}
                Female
              </label>
            </div>

            <div className="year-container">
              <p className="year-title">Age</p>

              <select
                className="year-dropdown"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">All Years</option>
                <option value="Puppy">Puppy</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
              <button className="apply">Apply</button>
              
            </div>
            <div className="pett-card" style={{marginTop:"290px"}}>
                  {Array.isArray(daata) && daata.length > 0 ? (
                    daata.map((pet) => (
                      <div key={pet._id} className="car-card">
                        <div>
                        <img className="car-image" onClick={() => descript(pet._id)} src={pet.imageUrl} alt="Pet" />
                          <div className="favorite-icon">
                            {iswishListed ? (
                              <FaHeart
                                className="heart-icon"
                                onClick={handleFavoriteRemove}
                              />
                            ) : (
                              <AiOutlineHeart
                                className="heart-icon"
                                onClick={handleFavoriteClick}
                              />
                            )}
                          </div>
                          <p className="car-title">{pet.breed}</p>
                          <p className="car-info">{pet.gender}</p>
                          <p className="car-location">
                            {pet.location}
                          </p>
                          <p className="car-price"> ₹{pet.price}</p>
                          <br />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No pets available.</p>
                  )}
                </div>

                <button onClick={consoleee}>asdsadasdas</button>
          </div>
        </div>
      </div></>)}
    </>
  );
};

export default Adopt;
