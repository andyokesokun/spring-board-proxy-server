const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // allow all origins

const spoofedHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Accept': 'application/json',
  'Referer': 'https://projects.springboard.com/'
};
// Proxy: Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const { count } = req.query;
    const response = await axios.get(`https://projects.springboard.com/jeopardy/api/categories?count=${count || 10}`,  { headers: spoofedHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Proxy: Get category by ID
app.get('/api/category', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing category ID' });

  try {
    const response = await axios.get(`https://projects.springboard.com/jeopardy/api/category?id=${id}`,  { headers: spoofedHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Start server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
