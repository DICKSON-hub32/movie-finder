const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/latest-movie-news', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=movies&language=en&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

module.exports = router;
