// routes/trending.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch trending movies' });
  }
});

module.exports = router;
