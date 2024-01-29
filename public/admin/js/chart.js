// BAR chart horizontal - "The top 5 brands with the highest revenue."
let chartType = "bar";
let brandList = ["Nike", "Adidas", "Levent", "Gucci", "Prada"];
let productList = [];
let percentOfEachOnes = [];
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
// Create event for Bar chart
$("#chart__filter1").on("change", async function (e) {
  const yearMonth = $(this).val();
  console.log("Year month", yearMonth);
  const res = await fetch(`https://localhost:3000/brands/top5brand?month_year=${yearMonth}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const data = await res.json();
  if(res.ok){
    const {top5Brands} = data;
    brandList = []
    revenueOfEachBrand = [];
    for(let i = 0; i < top5Brands.length; i++){
      brandList.push(top5Brands[i][0]);
      revenueOfEachBrand.push(top5Brands[i][1]);
    }
  }
  console.log(brandList, revenueOfEachBrand);
  
  // brandList = ["Test", "Nike", "Nikasa", "Pama", "Rocket"];
  // revenueOfEachBrand = [31500000, 47500000, 24000000, 25000000, 63000000];
  chartLabel = `The top 5 brands with the highest revenue in ${yearMonth}`;
  mychart.data.labels = brandList;
  mychart.data.datasets[0].data = revenueOfEachBrand; // Access the datasets array
  mychart.options.plugins.subtitle.text = chartLabel;
  mychart.update();
});
const fetchDataForBarChart = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const res = await fetch(`https://localhost:3000/brands/top5brand?month_year=${year}-${month}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const data = await res.json();
  if(res.ok){
    const {top5Brands} = data;
    brandList = []
    revenueOfEachBrand = [];
    for(let i = 0; i < top5Brands.length; i++){
      brandList.push(top5Brands[i][0]);
      revenueOfEachBrand.push(top5Brands[i][1]);
    }
  }
  console.log(brandList, revenueOfEachBrand);
  
  // brandList = ["Test", "Nike", "Nikasa", "Pama", "Rocket"];
  // revenueOfEachBrand = [31500000, 47500000, 24000000, 25000000, 63000000];
  chartLabel = `The top 5 brands with the highest revenue in ${year}-${month}`;
  mychart.data.labels = brandList;
  mychart.data.datasets[0].data = revenueOfEachBrand; // Access the datasets array
  mychart.options.plugins.subtitle.text = chartLabel;
  mychart.update();
}
fetchDataForBarChart();

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
$("#chart__filter2").on("change", async function (e) {
  const monthYear = $(this).val(); 
  console.log(monthYear);
  // Truy van database
  const res = await fetch(`https://localhost:3000/products/top5?month_year=${monthYear}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const data = await res.json();
  if(res.ok){
    const {products} = data;
    productList = []
    percentOfEachOnes = [];
    let total = 0;
    for(let i = 0; i < products.length; i++){
      total = total + products[i][1];
      productList.push(products[i][0])
    }
    for(let i = 0; i < products.length; i++){
      percentOfEachOnes.push(products[i][1]/total*100)
    }

  }
  console.log(productList, percentOfEachOnes);
  chartLabel = `The top 5 best-selling products in ${monthYear}`;
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


const fetchDataForPieChart = async () =>{
  const now = new Date();
  const month = now.getMonth()+1;
  const year = now.getFullYear();
  const res = await fetch(`https://localhost:3000/products/top5?month_year=${year}-${month}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const data = await res.json();
  if(res.ok){
    const {products} = data;
    productList = []
    percentOfEachOnes = [];
    let total = 0;
    for(let i = 0; i < products.length; i++){
      total = total + products[i][1];
      productList.push(products[i][0])
    }
    for(let i = 0; i < products.length; i++){
      percentOfEachOnes.push(products[i][1]/total*100)
    }

  }
  console.log(productList, percentOfEachOnes);
  chartLabel = `The top 5 best-selling products in ${year}-${month}`;
  mysecondchart.data.labels = productList;
  mysecondchart.data.datasets[0].data = percentOfEachOnes; // Access the datasets array
  mysecondchart.options.plugins.subtitle.text = chartLabel;
  mysecondchart.update();

}
fetchDataForPieChart();



function getLineList(labels, data, chart) {
  const labelList = labels;
  const dataList = data;
  console.log("Data list in get lines", dataList);
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
  console.log(lineList);
  return lineList;
}


const ctx2 = document.getElementById("chart-line").getContext("2d");

chartType = "line";
chartLabel = "Top 5 brand has the highest number of sold product";
chartLabelColor = "#6900ff";
yAxisLabelColor = "lime";
xAxisLabelColor = "aqua";
let listOfMonths = getMonthList();
let lineList = getLineList([],[], ctx2);

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
const updateLineChart = async () => {
  const res = await fetch(`https://localhost:3000/brands/top5BestSelling`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await res.json();
  const labelList = [];
  const dataList = []
  console.log(data);
  for(let i = 0; i < data.length; i++){
    labelList.push(data[i].brandName);
    dataList.push(data[i].quantitiesByMonth)
  }
  console.log("Fetch result", labelList, dataList);
  mylinechart.data.labels = getMonthList();
  mylinechart.data.datasets = getLineList(labelList, dataList, ctx2)
  mylinechart.update();
}
updateLineChart();
const mylinechart = new Chart(ctx2, chart2);

