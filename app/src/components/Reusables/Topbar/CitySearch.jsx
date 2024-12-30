import React, { useState,useRef } from 'react';
import './CitySearch.css';
import l from './l1.png';
import x from './x.png';
import city from './city.png'
import {StandaloneSearchBox,LoadScript} from "@react-google-maps/api";

function CitySearch({ onClose, onSelectLocation }) {
  // const [searchText, setSearchText] = useState('');
  // const [suggestions, setSuggestions] = useState([]);

  // const handleSearchChange = (event) => {
  //   const { value } = event.target;
  //   setSearchText(value);

  //   // Call the Google Places Autocomplete API here to get suggestions
  //   // For simplicity, let's assume you already have a function that fetches suggestions

  //   // Replace 'YOUR_GOOGLE_API_KEY' with your actual API key
  //   const googleApiKey = 'AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE';
  //   console.log(googleApiKey)
  //   const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE&libraries=places';

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === 'OK') {
  //         setSuggestions(data.predictions);
  //       } else {
  //         setSuggestions([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching suggestions:', error);
  //       setSuggestions([]);
  //     });
  // };
const inputRef = useRef();
console.log("place",inputRef)
const handleplacechange = () => {
  const place = inputRef.current.getPlaces(); // Change 'getplace()' to 'getPlaces()'
  if (place && place.length > 0) {
    const selectedPlace = place[0];
    console.log(selectedPlace.formatted_address);
    console.log(selectedPlace.geometry.location.lat());
    console.log(selectedPlace.geometry.location.lng());
    onSelectLocation(place);
  }
};





  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <LoadScript
        googleMapsApiKey='AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE'
        libraries={["places"]}
        >
<div className="city1">
          <div className="container12">
          <img className="locationimage1" src={city} style={{ width: '55px', height: '55px' }} alt="Location" />
            <h1>Select city</h1>
          </div>

          <div className="search-popup">
            {/* Your search bar content goes here */}
            <StandaloneSearchBox
        onLoad={ref=>{inputRef.current = ref}}
        onPlacesChanged={handleplacechange}
        >
            <input
              type="text"
              className="search-input1"
              placeholder="Search city"
            />
        </StandaloneSearchBox>

            <img className="locationimage" src={l} style={{ width: '25px', height: '35px' }} alt="Location" />
          </div>
          <div>
            <img className="ximage" src={x} style={{ width: '20px', height: '25px', cursor: 'pointer' }} onClick={onClose} alt="Close" />
          </div>
          {/* Display the suggestions */}
         
        </div>
      

        </LoadScript>
      </div>
    </div>
  );
}

export default CitySearch;
