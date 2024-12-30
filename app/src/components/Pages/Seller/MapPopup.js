import React, { useRef } from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

function MapPopup({ onClose, onSelectLocation }) {
  const inputRef = useRef();

  const handlePlaceChange = () => {
    const place = inputRef.current.getPlaces();
    if (place && place.length > 0) {
      const selectedPlace = place[0];
      console.log(selectedPlace.formatted_address);
      console.log(selectedPlace.geometry.location.lat());
      console.log(selectedPlace.geometry.location.lng());
      onSelectLocation(selectedPlace); // Call the onSelectLocation prop with the selected place
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <LoadScript googleMapsApiKey="AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE" libraries={['places']}>
          <div className="city1">
            <div className="container12">
              <h1>Select city</h1>
            </div>
            <div className="search-popup">
              {/* Your search bar content goes here */}
              <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChange}>
                <input type="text" className="search-input1" placeholder="Search city" />
              </StandaloneSearchBox>
            </div>
          </div>
        </LoadScript>
      </div>
    </div>
  );
}

export default MapPopup;
