const fetch = require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

app.get('/api/places', async (req, res) => {
  const { location, radius, key } = req.query;

  const placesApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=park&key=${key}`;

  try {
    const response = await fetch(placesApiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Places API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});