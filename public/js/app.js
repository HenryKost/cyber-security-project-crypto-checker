
// WARNING: This is insecure! API key exposed to client
const ALPHA_VANTAGE_KEY = "P7EBBJ023V46MAPV";

async function getPrice() {
    const symbol = document.getElementById('symbol').value;
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data['Realtime Currency Exchange Rate']) {
        const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        // Vulnerable to XSS: symbol not sanitized
        document.getElementById('result').innerHTML = `<b>${symbol}</b>: $${parseFloat(rate).toFixed(2)}`;
    } else {
        document.getElementById('result').innerHTML = 'Error fetching data';
    }
}
