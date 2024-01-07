import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';

const Submitted = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const [center, setCenter] = useState({ lat: 0, lng: 0 });


const address = '500 College Ave, Swarthmore, PA';
const ad = 'AIzaSyBItk6fyyFDDc_VGHbJuco5T9CJK-YgA_0';

const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${ad}`;

  useEffect(() => {
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          const newCenter = { lat, lng };
          setCenter(newCenter);
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        } else {
          console.error('No results found for the provided city and state.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Geocoding API:', error);
      });
  }, [geocodingApiUrl]);

  return (
    <div style={{ position: 'absolute', left: 0, top: 150, height: '50%', width: '50%' }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
      </GoogleMap>
      <div>City: {formData['City']}</div>
      <div>State: {formData['State']}</div>
    </div>
  );
};

export default Submitted;