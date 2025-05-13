const API_BASE = "https://api.coingecko.com/api/v3";

export async function getCoinList() {
  const res = await fetch(`${API_BASE}/coins/list`);
  return await res.json();
}

export async function getCoinData(coinId) {
  const res = await fetch(`${API_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true`);
  return await res.json();
}

export async function getCoinMarketChart(coinId) {
  const res = await fetch(`${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
  const data = await res.json();
  return data.prices;
}
