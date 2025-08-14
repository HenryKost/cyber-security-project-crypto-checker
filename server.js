const express = require('express');
const path = require('path');
const RateLimit = require('express-rate-limit');
const fetch = require('node-fetch'); // Use for making API calls
const cors = require('cors'); // To allow requests from your front-end
require('dotenv').config(); // Load environment variables
const app = express();
const PORT = 3000;

// Set up rate limiter
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Enable CORS for all routes
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// Get your API key from the environment variables
const ALPHA_VANTAGE_KEY = process.env.API_KEY;

// Create a new endpoint for your front-end to call
app.get('/getprice', async (req, res) => {
    const { symbol } = req.query; // Get the 'symbol' from the URL query parameters
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); // Send the data back to the client as JSON
    } catch (error) {
        // Handle any errors that occur during the fetch
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage.' });
    }
});

// Serve your static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`v1_secure running on http://localhost:${PORT}`);
});