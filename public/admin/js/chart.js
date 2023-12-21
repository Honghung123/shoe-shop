// BAR chart
const ctx = document.getElementById("chart-bars").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Nike", "Adidas", "Levent", "Gucci", "Shahi"],
    datasets: [
      { 
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 14,
        borderSkipped: false,
        backgroundColor:  [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)',
          'rgba(54, 162, 235)', 
        ], 
        data: [450, 500, 400, 550, 330],
        maxBarThickness: 20,
      },
    ],
  },
  options: { 
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: {
        display: false,
      },
      subtitle: {
        display: true,
        text: 'Top 5 best categories',
        color: "#ffffff",
        font: {
          size: 14,
          weight: "bold",
        } 
      }
    }, 
    scales: {
      y: {
        grid: { 
          drawBorder: true,
          display: false,
          drawOnChartArea: true,
          drawTicks: false,
        },
        ticks: { 
          beginAtZero: true, 
          font: {
            size: 16,
            family: "Poppins",
            style: "normal", 
          },
          color: "#fff",
        },
      },
      x: {
        grid: {
          beginAtZero : true,   
          drawOnChartArea: true,
          drawTicks: false,
        },
        ticks: {
          display: true,           
          font: {
            size: 14, 
            family: 'sans-serif',
          },
          color: "#fff",
        },
      },
    },
  },
});


// LINE chart
var ctx2 = document.getElementById("chart-line").getContext("2d");

var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
gradientStroke1.addColorStop(1, "rgba(191, 97, 250,0.2)");
gradientStroke1.addColorStop(0.4, "rgba(72,72,176,0.0)");
gradientStroke1.addColorStop(0, "rgba(97, 143, 250,0)"); //purple colors

var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
gradientStroke2.addColorStop(1, "rgba(228, 255, 56,0.2)");
gradientStroke2.addColorStop(0.1, "rgba(72,72,176,0.0)");
gradientStroke2.addColorStop(0, "rgba(20,23,39,0)"); //purple colors

new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Mobile apps",
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#e13efa",
        borderWidth: 3,
        backgroundColor: gradientStroke1,
        fill: true,
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        maxBarThickness: 6,
      },
      {
        label: "Websites",
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#60ff38",
        borderWidth: 3,
        backgroundColor: gradientStroke2,
        fill: true,
        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
          color: "#000000",
          font: {
            size: 11,
            family: "Poppins",
            weight: "bold", 
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          color: "#8c3efa",
          padding: 20,
          font: {
            size: 11,
            family: "Open Sans",
            weight: "bold",
          },
        },
      },
    },
  },
});
