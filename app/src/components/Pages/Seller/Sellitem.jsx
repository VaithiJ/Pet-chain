import React, { useEffect, useState, useRef } from "react";
import "./Sellitem.css";
import NavBar from "../../Reusables/SellerBar/SellerBar.js";
import jwt_decode from "jwt-decode";
import axios from "../../../url.js";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Autocomplete } from '@googlemaps/react-wrapper';
import { Carousel } from "../../Reusables/Carousel.js";
import MapPopup from "./MapPopup";
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import NVmenu from "../../Reusables/NV/NBmenu";
import SellerBar from "../../Reusables/SellerBar/SellerBar.js";

const Sellitem = () => {
  const [daata, setDaata] = useState([]);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [owner, setOwner] = useState("");
  const [mobile , setMobile] = useState();
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
 const [_id, setId] = useState();
 const [latitude, setLatitude] = useState("");
 const [longitude, setLongitude] = useState("");
 const [city, setCity] = useState("");
 const [state, setState] = useState("");
 const [country, setCountry] = useState("");
 const [pincode, setPincode] = useState("")
 const inputRef = useRef();

 const handlePlaceChange = async () => {
  const place = inputRef.current.getPlaces();
  if (place && place.length > 0) {
    const selectedPlace = place[0];
    console.log(selectedPlace.formatted_address);
    setLocation(selectedPlace.formatted_address);
    setLatitude(selectedPlace.geometry.location.lat());
    setLongitude(selectedPlace.geometry.location.lng());

    // Find the relevant address components
    const addressComponents = selectedPlace.address_components;
    const cityComponent = addressComponents.find(component =>
      component.types.includes("locality")
    );
    const stateComponent = addressComponents.find(component =>
      component.types.includes("administrative_area_level_1")
    );
    const countryComponent = addressComponents.find(component =>
      component.types.includes("country")
    );
    const postalCodeComponent = addressComponents.find(component =>
      component.types.includes("postal_code")
    );

    if (cityComponent) {
      setCity(cityComponent.long_name);
    }

    if (stateComponent) {
      setState(stateComponent.long_name);
    }

    if (countryComponent) {
      setCountry(countryComponent.long_name);
    }

    if (postalCodeComponent) {
      setPincode(postalCodeComponent.long_name);
    }

    console.log(selectedPlace.geometry.location.lat());
    console.log(selectedPlace.geometry.location.lng());
    handleSelectLocation(selectedPlace);
  }
};



const setloc =(e)=>{
  setLocation(e.target.value)
  console.log(location)
}

    const [cookies, setCookie, removeCookie] = useCookies([
    "user_token",
    "name",
  ]);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Function to handle the click event and open the map popup
  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };
  const tokenn = jwt_decode(cookies.user_token);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    console.log(location)
    e.preventDefault();
    try {
      const response = await axios.post(
        "/sellPets",
        {
          category,
          gender,
          breed,
          owner,
          mobile,
          price,
          location,
          name,
          age,
          latitude,
          longitude,
          city,
          state,
          country,
          pincode
        },
        { withCredentials: true }
      );

      console.log(response.data);

      const fetchData = async () => {
        try {
          const response = await axios.get("/allPets");
          console.log(response.data);
      
          // Filter the pets based on owner name
          const filteredPets = response.data.pets.filter(
            (pet) => pet.owner === tokenn.name
          );
      
          console.log(filteredPets);
      
          // Sort the filtered pets array based on createdAt property in descending order
          const sortedPets = filteredPets.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
      
          // Get the last added pet from the sorted and filtered pets array
          const lastAddedPet = sortedPets.length > 0 ? sortedPets[0] : null;
      
          console.log(lastAddedPet);
      
          setDaata(lastAddedPet ? [lastAddedPet] : []);
          setId(lastAddedPet ? lastAddedPet._id : null);
          console.log(lastAddedPet._id)

        } catch (error) {
          console.log(error);
        }
      };
      
      fetchData();
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
        customClass: "swal-custom-style", // Apply the custom CSS class

      });    }
  };
    useEffect(()=>{

      setOwner(tokenn.name)
      setMobile(tokenn.mobile)

  },[])
  useEffect(() => {
    if (_id) {
      navigate(`/addimage/${_id}`);
    }
  }, [_id, navigate]);
  
 

  return (
    <div >
      <SellerBar />

      <div className="kkkk" style={{display:"flex", flexDirection:"row"}}>
      {/* <Carousel />  */}
  
      <div
        className="description show"
        id="sssd"
        style={{ marginTop: "150px", marginLeft: "360px" }}
      >
        
        <h1 className="sdsd" style={{ marginLeft: "-00px" }}>Add your Pet</h1>
        <div className="det">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{width:"500px", marginLeft:"50px"}}>
              <label htmlFor="category" style={{color:"black"}}>Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>Name:</label>
              <input
                type="text"
                id="name"
                name="nameee"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="breed" style={{color:"black"}}>Breed:</label>
              <input
                type="text"
                id="breed"
                name="breeed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"495px",marginLeft:"50px"}}>
              <label htmlFor="age" style={{color:"black"}}>Life Stage:</label>
              <select
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="0">Select Value</option>
                <option value="puppy" style={{color:"black"}}>Puppy/Kitten/Baby</option>
                <option value="adult"style={{color:"black"}}>Adult</option>
                <option value="senior" style={{color:"black"}}>Senior</option>
              </select>
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
             {/*  <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                
              /> */}
    <LoadScript googleMapsApiKey="AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE" libraries={['places']}>
          <div className="city1">
            <div className="container12">
            <label htmlFor="location"style={{color:"black", width:"450px", position:"relative", left:"130px"}}>Location:</label>
            </div>
            <div className="search-popup">
              {/* Your search bar content goes here */}
              <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChange}>
                <input type="text" className="search-input1" style={{width:"270px", position:"relative", left:"-140px", top:"1px"}} placeholder="Search city" name="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}/>
              </StandaloneSearchBox>
            </div>
          </div>
        </LoadScript>
            </div>

            <div className="form-group" style={{width:"470px",marginLeft:"50px"}}>
              <label htmlFor="gender" style={{color:"black"}}>Gender:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{color:"black"}}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{color:"black", marginLeft:"-10px",}}
                  />{" "}
                  Female
                </label>
              </div>
            </div>
            <div className="form-group" style={{width:"505px",marginLeft:"50px"}}>
              <label htmlFor="price" style={{color:"black"}}>Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div> */}
            {/* <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>Pincode:</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div> */}

            <br />
            <div style={{ marginLeft: "80px" }}>
              <button
                className="option3-button"
                type="submit"
                style={{ marginLeft: "170px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sellitem;
