
// WARNING: This is insecure! API key exposed to client
const ALPHA_VANTAGE_KEY = "025L2AHL0GD3BL4G";

async function getPrice() {
    const symbol = document.getElementById('symbol').value;
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data['Realtime Currency Exchange Rate']) {
        const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        // Secure: use textContent to avoid XSS
        const resultElem = document.getElementById('result');
        resultElem.textContent = ''; // Clear previous content
        const bold = document.createElement('b');
        bold.textContent = symbol;
        resultElem.appendChild(bold);
        resultElem.appendChild(document.createTextNode(`: $${parseFloat(rate).toFixed(2)}`));
    } else {
        document.getElementById('result').innerHTML = 'Error fetching data';
    }
}
