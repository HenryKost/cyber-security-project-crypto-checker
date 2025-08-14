// This file runs in the browser, so no dotenv or process.env here
const ALPHA_VANTAGE_KEY = process.env.API_KEY;

async function getPrice() {
    const symbol = document.getElementById('symbol').value;
    // Call your server's new endpoint
    const url = `http://localhost:3000/getprice?symbol=${symbol}`;
    
    // It is important to sanitize user input to prevent XSS.
    // For demonstration purposes, we are not showing that here.

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data['Realtime Currency Exchange Rate']) {
            const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            document.getElementById('result').innerHTML = `<b>${symbol}</b>: $${parseFloat(rate).toFixed(2)}`;
        } else {
            document.getElementById('result').innerHTML = 'Error fetching data';
        }
    } catch (error) {
        document.getElementById('result').innerHTML = 'Network error or server issue.';
    }
}