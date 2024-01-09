/* eslint-disable default-case */
import { useEffect } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import Explore from "./pages/Explore"
import Submitted from "./pages/Submitted"

const center = { lat: 48.8584, lng: 2.2945 };

function App() {


  const apiKey = 'AIzaSyBItk6fyyFDDc_VGHbJuco5T9CJK-YgA_0';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']  
  });

  useEffect(() => {
    // Handle any error that occurred while loading the Google Maps JavaScript API
    if (loadError) {
      console.error('Error loading Google Maps API:', loadError);
    }
  }, [loadError]);

  if (loadError) {
    return "Error loading the map";
  }

  if (!isLoaded) {
    return "Loading...";
  }

  return (

    <Router>
      <div className='App'> 
        <Navbar />
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/plan' element={<Plan />} />
            <Route path='/explore' element={< Explore />} />
            <Route path='/submitted' element={<Submitted />} /> 
          </Routes>
      </div>
    </Router>
  );
}

export default App;