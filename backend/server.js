import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import data from './data.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Sample route (you can replace this with your real data later)
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
