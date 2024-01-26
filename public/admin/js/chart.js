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
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
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
chartType = "bar";
productList = [
  "Levent shoe made in Japan form New York brandnew genuine",
  "Nike isdf s sdf sdf sfsdf ssd",
  "Adidas max 20 23 2r 2s sdf sd",
  "Levent shoe made in Japan form New York brandnew genuine",
  "Levent shoe made in Japan form New York brandnew genuine",
];
totalSoldForEachOnes = [45, 20, 30, 55, 37];
chartLabel = "The top 5 best-selling products in 2024";
chartLabelColor = "white";
yAxisLabel = "Number of sold products";
xAxisLabel = "Product name";
yAxisLabelColor = "lime";
xAxisLabelColor = "aqua";
const ctxs = document.getElementById("chart-bars-vertical").getContext("2d");
const charts = {
  type: chartType,
  data: {
    labels: productList,
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
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
        ],
        data: totalSoldForEachOnes,
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
        text: chartLabel,
        color: chartLabelColor,
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
          text: yAxisLabel,
          color: yAxisLabelColor,
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
          text: xAxisLabel,
          color: xAxisLabelColor,
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
};
const mysecondchart = new Chart(ctxs, charts);
// Create envent for Bar chart
$("#chart__filter2").on("change", function () {
  const year = $(this).val(); 
  // Truy van database 
  productList = [
    "Arigatou gozaimasu",
    "Nike isdf s sdf sdf sfsdf ssd",
    "Prama indonssf sd sdf mas sdfsdf",
    "Levent shoe made in Japan form New York brandnew genuine",
    "Adidas max 20 23 2r 2s sdf sd",
  ];
  totalSoldForEachOnes = [10, 20, 30, 35, 25];
  // end
  chartLabel = `The top 5 best-selling products in ${year}`;
  mysecondchart.data.labels = productList;
  mysecondchart.data.datasets[0].data = totalSoldForEachOnes; // Access the datasets array
  mysecondchart.options.plugins.subtitle.text = chartLabel;
  mysecondchart.update(); 
});


// LINE chart

function getMonthList() {
  return ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // return Utils.months({ count: 7 });
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
    [50, 40, 300, 220, 500, 250, 400, 230, 500],
    [150, 10, 500, 120, 150, 50, 100, 330, 400],
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
        color: chartLabelColor,
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
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
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
