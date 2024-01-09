import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';

const Submitted = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [parks, setParks] = useState([]);

  const address = formData['City'] + formData['State'];
  const ad = 'AIzaSyBItk6fyyFDDc_VGHbJuco5T9CJK-YgA_0'; 

  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${ad}`;

  useEffect(() => {
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCenter({ lat, lng });
        } else {
          console.error('No results found for the provided city and state.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Geocoding API:', error);
      });
  }, [geocodingApiUrl, ad]);

  useEffect(() => {
    if (center.lat !== 0 && center.lng !== 0) {
      const placesApiUrl = `http://localhost:3001/api/places?location=${center.lat},${center.lng}&radius=2000&type=park&key=${ad}`;

      fetch(placesApiUrl)
        .then((response) => response.json())
        .then((data) => {
          setParks(data.results);
        })
        .catch((error) => {
          console.error('Error fetching data from Places API:', error);
        });
    }
  }, [center, ad]);

  const Algorithm = () => {

    let TiredPoints = formData['Slider1'];
    let EnergyPoints = (10-formData['Slider1']);
    
    let AdventurousPoints = (formData['Slider2']);
    let FearfulPoints = (10 - formData['Slider2']);
   
    let HappyPoints = (formData['Slider3']);
    let SadPoints = (10 - formData['Slider3']);

    let HungryPoints = formData['Slider5'];
    let NotHungryPoints = 10 - formData['Slider5'];

    let OutdoorsyPoints = formData['Slider6'];
    let NotOutdoorsyPoints = 10 - formData['Slider6'];

    let SocialPoints = formData['Slider7'];
    let NotSocialPoints = 10 - formData['Slider7'];

    let BoredPoints = formData['Slider8'];
    let NotBoredPoints = 10 - formData['Slider8'];

    let StayInPoints = formData['Slider9'];
    let GoOutPoints = 10 - formData['Slider9'];

    let ActivePoints = formData['Slider10'];
    let InactivePoints = 10 - formData['Slider10'];

    let ColdWeatherPoints = formData['Slider11'];
    let WarmWeatherPoints = formData['Slider12'];

    let SadnessPoints = formData['Slider13'];
    let HappinessPoints = 10 - formData['Slider13'];

    let FriendsWantedPoints = formData['Slider14'];
    let AlonePoints = 10 - formData['Slider14'];

    



  }

  



  return (
    <div style={{ position: 'absolute', left: 100, top: 150, height: '50%', width: '50%' }}>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        {parks.map((park, index) => (
          <Marker
            key={index}
            position={{ lat: park.geometry.location.lat, lng: park.geometry.location.lng }}
            // You can customize the marker by providing additional props
            // For example: icon, animation, etc.
          />
        ))}
      </GoogleMap>
      <br />
      <div>City: {formData['City']}</div>
      <div>State: {formData['State']}</div>
    </div>
  );
};

export default Submitted;