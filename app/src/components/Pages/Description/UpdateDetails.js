import React, { useEffect, useState, useRef } from "react";
import "../Seller/Sellitem.css";
import NavBar from "../../Reusables/SellerBar/SellerBar.js";
import jwt_decode from "jwt-decode";
import axios from "../../../url.js";
import { useCookies } from "react-cookie";
import { useNavigate , useParams} from "react-router-dom";
import { GoogleMap, Autocomplete } from '@googlemaps/react-wrapper';
import { Carousel } from "../../Reusables/Carousel.js";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import NVmenu from "../../Reusables/NV/NBmenu";



const UpdateDetails = () => {
  const [editModeCategory, setEditModeCategory] = useState(false);
  const [editModeBreed, setEditModeBreed] = useState(false);
  const [editModeGender, setEdtModeGender] = useState(false);
  const [editModeLocation, setEditModeLocation] = useState(false);
  const [editModePrice, setEditModePrice] = useState(false);
  const [editModeAge, setEditModeAge] = useState(false);
  const [editModeName, setEditModeName] = useState(false);

  
  const [initialData, setInitialData] = useState({}); // State to store initial fetched data

  const [daata, setDaata] = useState([]);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("")
  
  const inputRef = useRef();
  const { id } = useParams();


    const [cookies, setCookie, removeCookie] = useCookies([
    "user_token",
    "name",
  ]);


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

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };
  
  const handleNameEdit = () => {
    setEditModeName(true);
  };
  const handleBreedEdit = () => {
    setEditModeBreed(true);
  };
  const handleCategoryEdit = () => {
    setEditModeCategory(true);
  };  const handleGendewhiteit = () => {
    setEdtModeGender(true);
  };  const handleLocationEdit = () => {
    setEditModeLocation(true);
  };  const handlePriceEdit = () => {
    setEditModePrice(true);
  };  
  const handleAgeEdit = () => {
    setEditModeAge(true);
  };

  const tokenn = jwt_decode(cookies.user_token);
const navigate = useNavigate()
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Create an object to hold the updated fields
  const updatedFields = {};

  // Check if the category field is edited
  if (editModeCategory && category !== daata.category) {
    updatedFields.category = category;
  }

  // Check if the name field is edited
  if (editModeName && name !== daata.name) {
    updatedFields.name = name;
  }

  // Check if the breed field is edited
  if (editModeBreed && breed !== daata.breed) {
    updatedFields.breed = breed;
  }

  // Check if the age field is edited
  if (editModeAge && age !== daata.age) {
    updatedFields.age = age;
  }

  // Check if the gender field is edited
  if (editModeGender && gender !== daata.gender) {
    updatedFields.gender = gender;
  }

  // Check if the location field is edited
  if (editModeLocation && location !== daata.location) {
    updatedFields.location = location;
    updatedFields.city = city;
    updatedFields.state = state;
    updatedFields.country = country;
    updatedFields.pincode = pincode;
    updatedFields.latitude = latitude;
    updatedFields.longitude = longitude;

  }

  // Check if the price field is edited
  if (editModePrice && price !== daata.price) {
    updatedFields.price = price;
  }

  try {
    // Send the updated fields to the backend
    const response = await axios.put(`/updatePet/${id}`, updatedFields);
    console.log(response.data);

    // Show a success message using Swal
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Details updated successfully",
      showCloseButton: true,
    });
navigate(`/sellerdescription/${id}`)
  } catch (error) {
    console.error(error);

    // Show an error message using Swal
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to update details!",
    });
  }
};



  useEffect(() => {
    console.log(id)
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${id}`);
        setInitialData(response.data.user)
        setDaata(response.data.user)
        console.log(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
 
 

  return (
    <div >
      <NVmenu />
      <div className="kkkk" style={{display:"flex", flexDirection:"row"}}>
      {/* <Carousel />  */}
      <div
        className="description show"
        id="sssd"
        style={{ marginTop: "150px", marginLeft: "360px" }}
      >
        
        <h1 className="sdsd" style={{ marginLeft: "-00px" }}>Update your Pet</h1>
        <div className="det">
          <form onSubmit={handleSubmit}>
          {editModeCategory ? (
                <div className="form-group" style={{ width: "500px", marginLeft: "50px" }}>
                <label htmlFor="category" style={{ color: "black" }}>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          </div>
        ) : (
          <div className="form-group" style={{ width: "500px", marginLeft: "50px" }}>
            <label htmlFor="category" style={{ color: "black" }}>Category:</label>
            <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.category}
            <FaEdit style={{position:"relative", left:"90px", top:"5px", fontSize:"20px", cursor:"pointer"}} onClick={handleCategoryEdit}/> 
</div>
          </div>
        )}
         {editModeName ? (
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
         ):(
          <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
          <label htmlFor="name" style={{color:"black"}}>Name:</label>
          <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.name}</div>
          <FaEdit style={{position:"relative", left:"-30px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handleNameEdit}/> 

          </div>
         )}


{editModeBreed ? (


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
):(
  <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
  <label htmlFor="breed" style={{color:"black"}}>Breed:</label>
  <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.breed}</div>
  <FaEdit style={{position:"relative", left:"-30px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handleBreedEdit}/> 

</div>
)
}


{editModeAge ? (

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
):(
  <div className="form-group" style={{width:"495px",marginLeft:"50px"}}>
  <label htmlFor="age" style={{color:"black"}}>Life Stage:</label>
  <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.age}</div>
  <FaEdit style={{position:"relative", left:"-30px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handleAgeEdit}/> 

</div>
)}




        {editModeLocation ? (
          
         <div className="form-group" style={{ width: "500px", marginLeft: "50px" }}>
         {/* <label htmlFor="location" style={{ color: "black" }}>
           Location:
         </label> */}
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
        ) : (
          
         <div className="form-group" style={{ width: "500px", marginLeft: "50px" }}>
        <label htmlFor="location" style={{ color: "black" }}>
          Location:
        </label>
        <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.location}</div>
        <FaEdit style={{position:"relative", left:"-30px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handleLocationEdit}/> 

          </div>
        )}
            
        {editModeGender ? (
          <div className="form-group" style={{ width: "490px", marginLeft: "50px" }}>
          <label htmlFor="gender" style={{ color: "black" }}>
            Gender:
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                style={{ color: "black" }}
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
                style={{ color: "black", marginLeft: "-10px" }}
              />{" "}
              Female
            </label>
          </div>
          </div>
        ) : (
          <div className="form-group" style={{ width: "490px", marginLeft: "50px" }}>
        <label htmlFor="gender" style={{ color: "black" }}>
          Gender:
        </label>
        <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.gender}</div>
        <FaEdit style={{position:"relative", left:"-25px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handleGendewhiteit}/> 

          </div>
        )}
           
        {editModePrice ? (
          <div className="form-group" style={{ width: "505px", marginLeft: "50px" }}>
          <label htmlFor="price" style={{ color: "black" }}>
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          </div>
        ) : (
          <div className="form-group" style={{ width: "505px", marginLeft: "50px" }}>
        <label htmlFor="price" style={{ color: "black" }}>
          Price:
        </label>
        <div style={{fontFamily:"Nunito", backgroundColor:"white", width:"250px", height:"27px"}}>{initialData.price}</div>
        <FaEdit style={{position:"relative", left:"-30px", top:"0px", fontSize:"20px", cursor:"pointer"}} onClick={handlePriceEdit}/> 

          </div>
        )}

            <br />
            <div style={{ marginLeft: "80px" }}>
              <button
                className="option2-button"
                type="submit"
                style={{ marginLeft: "170px" }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
