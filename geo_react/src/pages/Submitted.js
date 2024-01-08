import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';


const Submitted = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const [center, setCenter] = useState({ lat: 0, lng: 0 });


    const address = formData['City'] + formData['State']
    const ad = 'AIzaSyBItk6fyyFDDc_VGHbJuco5T9CJK-YgA_0';

const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${ad}`;

useEffect(() => {
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          var { lat, lng } = data.results[0].geometry.location;
          var newCenter = { lat, lng };
          setCenter(newCenter);
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  
          // Fetch and display nearby places
          lat = newCenter.lat;
          lng = newCenter.lng;
  
          const placesApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${2000}&type=park&key=${ad}`;
  
          fetch(placesApiUrl)
            .then((response) => response.json())
            .then((data) => {
              // Handle the data from the Places API response
              console.log(data.results);
  
              // Display markers on the map
              const map = new window.google.maps.Map(document.getElementById('map'), {
                center: newCenter,
                zoom: 15,
              });
  
              data.results.forEach((place) => {
                new window.google.maps.Marker({
                  position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
                  map: map,
                  title: place.name,
                });
              });
            })
            .catch((error) => {
              // Handle any errors that occurred during the fetch
              console.error('Error fetching data from Places API:', error);
            });
        } else {
          console.error('No results found for the provided city and state.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Geocoding API:', error);
      });
  }, [geocodingApiUrl, ad]);


  

  let TiredPoints = formData['Slider1'];
  let EnergyPoints = (10-formData['Slider1']);
  let AdventurousPoints = (formData['Slider2']);
  let FearfulPoints = (10 - formData['Slider2']);
  let HappyPoints = (formData['Slider3']);
  let SadPoints = (10 - formData['Slider3']);





    return (
    
        <div style={{ position: 'absolute', left: 100, top: 150, height: '50%', width: '50%' }}>
        <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
        >
        </GoogleMap>
        <br />
        <div>City: {formData['City']}</div>
        <div>State: {formData['State']}</div>
        <div>Tired: {TiredPoints}</div>
        <div>Energetic: {EnergyPoints}</div>
        
        </div>
  );
};

export default Submitted;