import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation, handleSelectLocation }) => {
  const mapRef = useRef(null);

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const apiKey = "AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE"
  const handleCenterChanged = () => {
    const newCenter = mapRef.current.getCenter().toJSON();
    if (newCenter.lat !== mapCenter.lat || newCenter.lng !== mapCenter.lng) {
      setMapCenter(newCenter);
    }



  };

  return (
    <LoadScript googleMapsApiKey={apiKey}libraries={["places"]}>

    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      initialCenter={mapCenter}
      zoom={8}
      onLoad={map => {
        mapRef.current = map;
        map.addListener('center_changed', handleCenterChanged);
      }}
    >
      {/* StandaloneSearchBox for searching locations */}
      <StandaloneSearchBox onPlacesChanged={handleSelectLocation}>
        {/* Your search input component */}
        <input type="text" placeholder="Search location" />
      </StandaloneSearchBox>

      {/* Marker for the selected location */}
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <InfoWindow>
            {/* Info window content */}
            <div>Selected Location</div>
          </InfoWindow>
        </Marker>
      )}
    </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
