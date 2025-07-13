const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // allow all origins

// Proxy: Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const response = await fetch('https://projects.springboard.com/jeopardy/api/categories?count=10');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Proxy: Get category by ID
app.get('/api/category', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing category ID' });

  try {
    const response = await fetch(`https://projects.springboard.com/jeopardy/api/category?id=${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
