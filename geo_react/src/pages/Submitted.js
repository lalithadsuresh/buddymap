import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';
import Plan from './Plan';



const Submitted = () => {

 // lol dont ask why this is here it's not
  // working when i put it in list for some
  // reason 

  const location = useLocation();
  const formData = location.state?.formData || {};
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState([]);
  const [chosenPlace, setChosenPlace] = useState('');

  const address = formData['City'] + formData['State'];
  const ad = 'AIzaSyBItk6fyyFDDc_VGHbJuco5T9CJK-YgA_0';

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

  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${ad}`;

  useEffect(() => {
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
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
      setChosenPlace(LazyorActive());
      const placesApiUrl = `http://localhost:3001/api/places?location=${center.lat},${center.lng}&radius=2000&type=${chosenPlace.text}&key=${ad}`;

      fetch(placesApiUrl)
        .then((response) => response.json())
        .then((data) => {
          setPlaces(data.results || []);
        })
        .catch((error) => {
          console.error('Error fetching data from Places API:', error);
        });
    }
  }, [center, ad]);

  const LazyorActive = () => {

    let text = '';
    let lazy_types = [
        'aquarium',
        'bakery',
        'book_store',
        'cafe',
        'campground',
        'library',
        'movie_rental',
        'movie_theater',
        'spa',
      ];
    
    let energy_types = [

        'amusement_park',
        'aquarium',
        'art_gallery',
        'bar',
        'bowling_alley',
        'cafe',
        'clothing_store',
        'gas_station',
        'gym',
        'night_club',
        'park',
        'shopping_mall',
        'tourist_attraction',
        'zoo'
      
    ]

    if (TiredPoints > EnergyPoints) {
      
      const randomIndex = Math.floor(Math.random() * lazy_types.length);
      let chosenPlace = lazy_types[randomIndex];
      text += 'You seem to be tired this weekend. It may be better to do lighter activities';
      text += ` You could go to a ${chosenPlace}. On the map above, markers are placed
      on different ${chosenPlace}s for you to visit over the weekend.`;
      return {text: text, chosenPlace: chosenPlace};
    } 
    if (EnergyPoints > TiredPoints) { 
      const randomIndex2 = Math.floor(Math.random() * energy_types.length);
      let chosenPlace = energy_types[randomIndex2]; 
      text += 'It seems like you have a lot of energy to do some fun activities this weekend';
      return {text: text, chosenPlace: chosenPlace};
    }

    return { text: '', chosenPlace: '' };
  };
 
  
  return (
    <div style={{ position: 'absolute', left: 100, top: 150, height: '50%', width: '50%' }}>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        {places
            .map((place, index) => (
            <Marker
                key={index}
                position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
            />
            ))}
      </GoogleMap>
      <br />
      <div>City: {formData['City']}</div>
      <div>State: {formData['State']}</div>
      <div> {chosenPlace.text} </div>
    </div>
  );
};

export default Submitted;