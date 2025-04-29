// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Read products
app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8');
    const products = JSON.parse(data).products;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error reading products' });
  }
});

// Other CRUD endpoints here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});