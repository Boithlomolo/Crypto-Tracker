// let chart;

// export function renderChart(chartData) {
//   const ctx = document.getElementById('priceChart').getContext('2d');

//   if (chart) chart.destroy();

//   const labels = chartData.map(p => new Date(p[0]).toLocaleDateString());
//   const prices = chartData.map(p => p[1]);

//   chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels,
//       datasets: [{
//         label: 'Price (USD)',
//         data: prices,
//         fill: true,
//         borderColor: 'blue',
//         backgroundColor: 'rgba(0, 123, 255, 0.1)',
//         tension: 0.2
//       }]
//     }
//   });
// }
