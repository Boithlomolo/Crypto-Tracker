const coinSelect = document.getElementById("coinSelect");
const coinName = document.getElementById("coinName");
const coinPrice = document.getElementById("coinPrice");
const coinChange = document.getElementById("coinChange");
const chartCanvas = document.getElementById("priceChart");

let priceChart; // Chart.js instance

// Fetch coin data and update UI
async function fetchCoinData(coinId) {
  try {
    // Current price and change
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const data = await response.json();

    const name = data.name;
    const price = data.market_data.current_price.usd;
    const change = data.market_data.price_change_percentage_24h;

    coinName.textContent = `Name: ${name}`;
    coinPrice.textContent = `Price: $${price.toLocaleString()}`;
    coinChange.textContent = `24h Change: ${change.toFixed(2)}%`;

    coinChange.style.color = change >= 0 ? "green" : "red";

    // Fetch historical price chart data
    fetchChartData(coinId);

  } catch (error) {
    console.error("Error fetching coin data:", error);
  }
}

// Fetch and render 7-day price chart
async function fetchChartData(coinId) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    const data = await res.json();

    const prices = data.prices;
    const labels = prices.map(p => new Date(p[0]).toLocaleDateString());
    const priceData = prices.map(p => p[1]);

    renderChart(labels, priceData, coinId);

  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
}

// Render Chart.js chart
function renderChart(labels, data, coinId) {
  if (priceChart) priceChart.destroy(); // Clear previous chart

  priceChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${coinId.toUpperCase()} Price (Last 7 Days)`,
        data: data,
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Initial load
window.addEventListener("load", () => {
  fetchCoinData(coinSelect.value);
});

// Change coin
coinSelect.addEventListener("change", () => {
  fetchCoinData(coinSelect.value);
});
