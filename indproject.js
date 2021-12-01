  const superSector = {
    "00":	"Total nonfarm",
    "05":	"Total private",
    "06":	"Goods-producing",
    "07":	"Service-providing",
    "08":	"Private service-providing",
    "10":	"Mining and logging",
    "20":	"Construction",
    "30": "Manufacturing",
    "31": "Durable Goods",
    "32":	"Nondurable Goods",
    "40": "Trade, transportation, and utilities",
    "41":	"Wholesale trade",
    "42":	"Retail trade",
    "43":	"Transportation and warehousing",
    "44": "Utilities",
    "50":	"Information",
    "55":	"Financial activities",
    "60":"Professional and business services",
    "65":	"Education and health services",
    "70":	"Leisure and hospitality",
    "80":	"Other services",
    "90":	"Government"
  }
    
    const labels =[];
    let responseCount = 0;
//    console.log("labels");
//    console.log(labels);

// These are colors from chart.js utils
    const CHART_COLORS = { //make 22 colors
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      black: 'rgba(0, 0, 0, 0.5)',
      pink: 'rgba(212, 31, 182, 0.5)',
      magenta:'rgba(255, 0, 255, 0.5)',
      lightBlue: 'rgba(83, 201, 236, 0.5)',
      lightGreen: 'rgba(109, 245, 82, 0.5)',
      brown:'rgba(78, 16, 16, 0.5)',
      lightPurple: 'rgba(187, 4, 211, 0.5)',
      Turquoise: 'rgba(4, 211, 211, 0.5)',
      darkPurple: 'rgba(51, 0, 102, 0.5)',
      gold: 'rgba(255, 215, 0, 0.5)',
      darkPink: 'rgba(231, 84, 128, 0.5)',
      violet: 'rgba(143, 0, 255, 0.5)',
      darkGreen: 'rgba(35, 80, 21, 0.5)',
      navyBlue: 'rgba(9, 16, 109, 0.5)',
      coral: 'rgba(240, 128, 128, 0.5)',
    };
//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = { //make 22 colors
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      black: 'rgba(0, 0, 0, 0.5)',
      pink: 'rgba(212, 31, 182, 0.5)',
      magenta:'rgba(255, 0, 255, 0.5)',
      lightBlue: 'rgba(83, 201, 236, 0.5)',
      lightGreen: 'rgba(109, 245, 82, 0.5)',
      brown:'rgba(78, 16, 16, 0.5)',
      lightPurple: 'rgba(187, 4, 211, 0.5)',
      Turquoise: 'rgba(4, 211, 211, 0.5)',
      darkPurple: 'rgba(51, 0, 102, 0.5)',
      gold: 'rgba(255, 215, 0, 0.5)',
      darkPink: 'rgba(231, 84, 128, 0.5)',
      violet: 'rgba(143, 0, 255, 0.5)',
      darkGreen: 'rgba(35, 80, 21, 0.5)',
      navyBlue: 'rgba(9, 16, 109, 0.5)',
      coral: 'rgba(240, 128, 128, 0.5)',
    };

    let colorArray = Object.keys(CHART_COLORS_50_Percent);
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: labels,
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
function drawChart() {
    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
//    console.dir(myChart);
//    console.log("Ending");
}


function responseReceivedHandler() {
  if (this.status == 200) {
    let graphline = {
      label: "",
      data: [],
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS_50_Percent.red,
      hidden: true
    }
    let seriesID = this.response.Results.series[0].seriesID;
    
    let superSectorLabel = seriesID.substring(3,5);
    
    graphline.label = superSector[superSectorLabel];
    graphline.borderColor = CHART_COLORS[colorArray[responseCount]];
    graphline.backgroundColor = CHART_COLORS_50_Percent[colorArray[responseCount]];
    console.log(seriesID);
    let dataArray = this.response.Results.series[0].data;
    console.log(dataArray.length);
    console.log(dataArray);
    for (let i=dataArray.length - 1; i >= 0; i--) {
      if(responseCount == 0) {
        labels.push(dataArray[i].periodName + " " + dataArray[i].year); 
      }
      graphline.data.push(dataArray[i].value);
    }
    data.datasets.push(graphline);
    responseCount += 1;
    if (responseCount == Object.keys(superSector).length) {
      drawChart();
    }
    console.log(this.response);
  }
  else {
    console.log("error");
  }
}

for (superSectorLabel in superSector) {
  console.log(superSector[superSectorLabel]);
let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler); 
  xhr.responseType = "json"; 
  let startQuery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
  let endQuery = "00000001?registrationkey=9309bf3ddcaf410bbdeb9e270939c890";
  xhr.open("GET", startQuery + superSectorLabel + endQuery, true);
  xhr.send();
  }
