// BAR chart horizontal - "The top 5 brands with the highest revenue."
const ctx = document.getElementById("chart-bars-horizontal").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Nike", "Adidas", "Levent", "Gucci", "Prada"],
    datasets: [
      {
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 14,
        borderSkipped: false,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
        ],
        data: [41500000, 17500000, 64000000, 55000000, 33000000],
        maxBarThickness: 20,
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      subtitle: {
        display: true,
        text: "The top 5 brands with the highest revenue.",
        color: "#ffffff",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        title: {
          display: true,
          text: "Brand",
          color: "lime",
          font: {
            size: 16,
            weight: "bold",
            lineHeight: 1.2,
          },
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
          beginAtZero: true,
          drawOnChartArea: true,
          drawTicks: false,
        },
        title: {
          display: true,
          text: "Total revenue (VND)",
          color: "aqua",
          font: {
            size: 16,
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        ticks: {
          display: true,
          font: {
            size: 14,
            family: "sans-serif",
          },
          color: "#fff",
        },
      },
    },
  },
});

// BAR chart horizontal - "The top 5 best-selling products."
const ctxs = document.getElementById("chart-bars-vertical").getContext("2d");
new Chart(ctxs, {
  type: "bar",
  data: {
    labels: [
      "Levent shoe made in Japan form New York brandnew genuine",
      "Nike isdf s sdf sdf sfsdf ssd",
      "Adidas max 20 23 2r 2s sdf sd",
      "Levent shoe made in Japan form New York brandnew genuine",
      "Levent shoe made in Japan form New York brandnew genuine",
    ],
    datasets: [
      {
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 14,
        borderSkipped: false,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
        ],
        data: [45, 20, 30, 55, 37],
        maxBarThickness: 20,
      },
    ],
  },
  options: {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      subtitle: {
        display: true,
        text: "The top 5 best-selling products in 2024",
        color: "#ffffff",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 20 },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of sold products",
          color: "lime",
          font: {
            size: 16,
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
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
          display: false,
        },
        title: {
          display: true,
          text: "Product name",
          color: "aqua",
          font: {
            weight: "bold",
            size: 16,
          },
          padding: { top: 5, left: 0, right: 0, bottom: 0 },
        },
        ticks: {
          display: true,
          font: {
            size: 14,
            family: "sans-serif",
          },
          color: "#fff",
          callback: function (value) {
            // truncate the labels only in this axis
            const lbl = this.getLabelForValue(value);
            if (typeof lbl === "string" && lbl.length > 40) {
              return `${lbl.substring(0, 40)}...`;
            }
            return lbl;
          },
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
          color: "#06e6ff",
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
          color: "#8d25ffc4",
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
