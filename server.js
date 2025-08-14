
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/price', async (req, res) => {
  const symbol = req.query.symbol || '';
  const safeSymbol = symbol.replace(/[^a-zA-Z]/g, ''); // basic sanitization
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  try {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${safeSymbol}&to_currency=USD&apikey=${apiKey}`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    if (data['Realtime Currency Exchange Rate']) {
      const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      res.json({ symbol: safeSymbol, price: parseFloat(rate).toFixed(2) });
    } else {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`v2_secure running on http://localhost:${PORT}`));
