// BAR chart horizontal - "The top 5 brands with the highest revenue."
let chartType = "bar";
let brandList = ["Nike", "Adidas", "Levent", "Gucci", "Prada"];
let revenueOfEachBrand = [41500000, 17500000, 64000000, 55000000, 33000000];
let chartLabel = "The top 5 brands with the highest revenue in 2024-01";
let chartLabelColor = "white";
let yAxisLabel = "Brand";
let xAxisLabel = "Total revenue (VND)";
let yAxisLabelColor = "lime";
let xAxisLabelColor = "aqua";

const ctx = document.getElementById("chart-bars-horizontal").getContext("2d");
const chart = {
  type: chartType,
  data: {
    labels: brandList,
    datasets: [
      {
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 14,
        borderSkipped: false,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
          "rgba(255, 205, 86)",
          "rgba(255, 159, 64)",
        ],
        data: revenueOfEachBrand,
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
        text: chartLabel,
        color: chartLabelColor,
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
          display: false, 
        },
        title: {
          display: true,
          text: yAxisLabel,
          color: yAxisLabelColor,
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
          lineWidth: 2,
        },
        title: {
          display: true,
          text: xAxisLabel,
          color: xAxisLabelColor,
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
};
const mychart = new Chart(ctx, chart);
// Create envent for Bar chart
$("#chart__filter1").on("change", function () {
  const yearMonth = $(this).val();
  brandList = ["Test", "Nike", "Nikasa", "Pama", "Rocket"];
  revenueOfEachBrand = [31500000, 47500000, 24000000, 25000000, 63000000];
  chartLabel = `The top 5 brands with the highest revenue in ${yearMonth}`;
  mychart.data.labels = brandList;
  mychart.data.datasets[0].data = revenueOfEachBrand; // Access the datasets array
  mychart.options.plugins.subtitle.text = chartLabel;
  mychart.update();
});

// BAR chart horizontal - "The top 5 best-selling products."
chartType = "doughnut";
productList = [
  "Giay cao got",
  "Giay boot",
  "Giay tay",
  "Giay call",
  "Giay the thao",
];
percentOfEachOnes = [30, 20, 10, 35, 5];
chartLabel = "The top 5 best-selling products in 2024";
chartLabelColor = "white";
const ctxs = document.getElementById("chart-bars-doughnut").getContext("2d");
const charts = {
  type: chartType,
  data: {
    datasets: [
      {
        data: percentOfEachOnes,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
    labels: productList,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgb(255 255 235)",
        },
      },
      subtitle: {
        display: true,
        text: chartLabel,
        color: chartLabelColor,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
      },
    },
  },
};

const mysecondchart = new Chart(ctxs, charts);
// Create envent for Bar chart
$("#chart__filter2").on("change", function () {
  const year = $(this).val(); 
  // Truy van database
  productList = [
    "Prama indonssf ",
    "Arigatou gozaimasu",
    "Prama indonssf",
    "Nike isdf s",
    "Prama indonssf",
  ];
  percentOfEachOnes = [10, 20, 30, 20, 20];
  // end
  chartLabel = `The top 5 best-selling products in ${year}`;
  mysecondchart.data.labels = productList;
  mysecondchart.data.datasets[0].data = percentOfEachOnes; // Access the datasets array
  mysecondchart.options.plugins.subtitle.text = chartLabel;
  mysecondchart.update();
});

// LINE chart

function getMonthList() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}

function getBackgroundList(num, chart) {
  let bgList = [];
  for (let i = 0; i < num; i++) {
    let gradientStroke = chart.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(191, 97, 250,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(97, 143, 250,0)"); //purple colors
    bgList.push(gradientStroke);
  }
  return bgList;
}

function getLineList(month, chart) {
  // Can truy van database
  const labelList = ["Mobile apps", "Web apps"];
  const dataList = [
    [50, 40, 300, 220, 500, 250, 400, 230, 500, 520, 200, 120],
    [150, 10, 500, 120, 150, 50, 100, 330, 400, 120, 340, 550],
  ];
  // End
  const lineColorList = [
    "#e13efa",
    "#97d5ff",
    "#9ac1e0",
    "#d4a5a5",
    "#b0d8c1",
    "#f5c482",
    "#9eb3c8",
    "#c1a1d4",
    "#b0d8c1",
    "#e0c29a",
  ];

  const num = labelList.length;
  const bgColorList = getBackgroundList(num, chart);
  let lineList = [];
  for (let i = 0; i < num; i++) {
    let line = {
      label: labelList[i],
      tension: 0.4,
      borderWidth: 0,
      pointRadius: 0,
      borderColor: lineColorList[i],
      borderWidth: 3,
      backgroundColor: bgColorList[i],
      fill: true,
      data: dataList[i],
      maxBarThickness: 6,
    };
    lineList.push(line);
  }
  return lineList;
}

const ctx2 = document.getElementById("chart-line").getContext("2d");

chartType = "line";
chartLabel = "Top 5 brand has the highest number of sold product";
chartLabelColor = "#6900ff";
yAxisLabelColor = "lime";
xAxisLabelColor = "aqua";
let listOfMonths = getMonthList();
let lineList = getLineList(7, ctx2);

const chart2 = {
  type: chartType,
  data: {
    labels: listOfMonths,
    datasets: lineList,
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "rgb(74 255 235)",
      },
    },
    subtitle: {
      display: true,
      text: chartLabel,
      color: chartLabelColor,
      font: {
        size: 16,
        weight: "bold",
      },
      padding: { top: 0, left: 0, right: 0, bottom: 0 },
    },
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgb(74 255 150)",
        },
      },
      title: {
        display: true,
        text: chartLabel,
        color: chartLabelColor,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
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
          lineWidth: 2,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
          color: yAxisLabelColor,
          font: {
            size: 11,
            family: "Poppins",
            weight: "bold",
          },
        },
      },
      x: {
        grid: { 
          display: false, 
        },
        ticks: {
          display: true,
          color: xAxisLabelColor,
          padding: 20,
          font: {
            size: 11,
            family: "san-serif",
            weight: "bold",
          },
        },
      },
    },
  },
};
const mylinechart = new Chart(ctx2, chart2);
