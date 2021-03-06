/* Bar Chart Color Pallete - Categories */
const barColorPalette_Categories = [
  "#e84f6a",
  "#ee4f2a",
  "#df6f4e",
  "#d6882d",
  "#dbba42",
  "#cfe035",
  "#91a131",
  "#c5e56e",
  "#5eb834",
  "#77e845",
  "#4e983f",
  "#78eb85",
  "#4bbc6b",
  "#4be9b7",
  "#4691eb",
  "#8d7ce8",
  "#c559e9",
  "#db63c7",
  "#e65796"
];

/* Pie Chart Color Pallete - Centers */
const pieColorPalette_Centers = [
  "#c54e68",
  "#c35c32",
  "#cdb153",
  "#94d951",
  "#5c823c",
  "#6dd4ab",
  "#6685ca",
  "#774ccc",
  "#b46cad",
  "#d147be"
];

/**
 * Description: gets patent metrics Object from the NTTP API via POST request to server
 * @param  {string[]} metrics Metrics we want from server. Example: ["Categories, Centers"].
 * @return {Promise<Object>}  On resolved Promise, returns a 'data' Object with organized data gathered. Example: data.metrics.categories.
 *                            On rejected Promise, Error is thrown.
 */
function getPatentMetrics(metrics) {
  return new Promise((resolve, reject) => {
    $.post("metrics", { metrics })
      .then((data, status) => {
        if(status == 'success') {
          resolve(data);
        } else {
          reject(`Failed POST request for patent metrics '${metrics}': ${status}`);
        }
      })
      .catch((err) => {
        reject(`Failed POST request for patent metrics '${metrics}': ${err}`);
      });
  });
}

/**
 * Description: Draws a bar chart to the given <canvas> via 'Chart.js'.
 * @param {string}   elementId HTML id attribute of the <canvas> element we want to target. Example: "my-new-chart".
 * @param {string}   title     Title of the chart. Example: "Number of People Per State".
 * @param {string}   xlabel    Label of the X-Axis. Example: "State" .
 * @param {string}   yLabel    Label of the Y-Axis. Example: "Number of People".
 * @param {string[]} labels    Bars to be used on X-Axis. Example: ["California", "Texas"].
 * @param {string[]} values    Values to be used for each bar. Example: [39, 29].
 *                             NOTE: size of 'labels' must be equal to the size of 'values'
 * @param {string[]} palette   Color palette of the chart. Example: ["#012345", "#abcdef"].
 *                             NOTE: 'palette' size must be >= to size of "labels" + 2.
 */
function makeBarChart(elementId, title, xLabel, yLabel, labels, values, palette) {
  
  /**
   * Description: Redirects client to NTTP patents page in a new tab with a search of the bar clicked.
   * @param {MouseEvent}     event Generic MouseEvent triggered on click on bar in bar chart. 
   * @param {Array.<Object>} array Array of objects that holds the index of the bar clicked. Example: array[0]._index
   */
  function barClickEvent(event, array){
    if(array.length != 0){ // bar was clicked
      let index = array[0]._index; // index of bar clicked
      let label = labels[index];
      let search = "https://technology.nasa.gov/search/aw/patent/" + label;
      
      /* redirect to new tab with 'search' string */
      var win = window.open(search, '_blank');
      if (win) {
          /* Browser has allowed it to be opened */
          win.focus();
      } else {
          /* Browser has blocked it */
          alert('Please allow popups for this website');
      }
    }
  };

  /* Set animation for Bar Chart to 2 seconds */
  Chart.defaults.global.animation.duration = 2000;

  /* Build gradient colors for each bar based on palette passed */
  let bar_ctx = document.getElementById(elementId).getContext('2d');
  let backgroundColors = []; // each 'backgroundColor' in this array will correspond to a bar's color
  for(let i = 0; i < labels.length; i++) {
    backgroundColor = bar_ctx.createLinearGradient(0, 0, 0, 600);
    backgroundColor.addColorStop(0.0, palette[i]);
    backgroundColor.addColorStop(0.5, palette[i+1]);
    backgroundColor.addColorStop(1.0, palette[i+2]);
    backgroundColors.push(backgroundColor);
  }

  /* Render Bar Chart to <canvas> id=elementId */
  var barChart = document.getElementById(elementId).getContext('2d');
  new Chart(barChart, {
    type: 'bar',
    data: {
      labels: labels, // @param labels
      datasets: [{
        label: xLabel, // @param xLabel
        data: values, // @param values
        backgroundColor: backgroundColors, // gradient palette
        hoverBorderColor: "white", 
        hoverBorderWidth: 4
      }]
    },
    options: {
      onClick: barClickEvent,
      responsive: true,
      title: {
        display: true,
        text: title, // @param title
        fontFamily: "'Raleway', sans-serif",
        fontColor: "white",
        fontSize: 36
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        titleFontFamily: "'Roboto Condensed', sans-serif",
        titleFontSize: 18,
        titleFontColor: "black",
        bodyFontFamily: "'Roboto Condensed', sans-serif",
        bodyFontSize: 14,
        bodyFontColor: "black"
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            fontColor: "white",
            fontSize: 18
          },
          scaleLabel: {
            display: true,
            labelString: xLabel, // @param xLabel
            fontFamily: "'Roboto Condensed', sans-serif",
            fontColor: "#ba0011",
            fontSize: 24
          },
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            fontFamily: "'Roboto Condensed', sans-serif",
            fontColor: "white",
            fontSize: 18
          },
          scaleLabel: {
            display: true,
            labelString: yLabel, // @param yLabel
            fontFamily: "'Roboto Condensed', sans-serif",
            fontColor: "#ba0011",
            fontSize: 24,
          },
          gridLines: {
            color: '#0B3D91'
          }
        }]
      }
    }
  });
};

/**
 * Description: Draws a pie chart to the given canvas via Chart.js
 * @param {string}   elementId HTML id attribute of the <canvas> element we want to target. Example: "my-new-chart".
 * @param {string}   title     Title of the chart. Example: "Number of People Per State".
 * @param {string[]} labels    Slices to be used in pie chart. Example: ["California", "Texas"].
 * @param {string[]} values    Values to be used for each slice of pie chart. Example: [39, 29].
 *                             NOTE: size of 'labels' must be equal to the size of 'values'
 * @param {string[]} palette   Color palette of the chart. Example: ["#012345", "#abcdef"].
 *                             NOTE: 'palette' size must be >= to size of 'labels'.
 */
function makePieChart(elementId, title, labels, values, palette) {
  
  /**
   * Description: Redirects client to NTTP patents page in a new tab with a search of the bar clicked.
   * @param {MouseEvent}     event Generic MouseEvent triggered on click on bar in bar chart. 
   * @param {Array.<Object>} array Array of objects that holds the index of the slice clicked. Example: array[0]._index
   */
  function pieClickEvent(event, array) {
    if(array.length != 0) { // slice was clicked
      let index = array[0]._index; // index of slice clicked
      let label = labels[index];

      /* NTTP requires a search string, therefore we need to grab a search 'term' from the client */
      let term = prompt("Please enter a search term", "Engines");
      if (term != null && term != "") {
        let search = "https://technology.nasa.gov/search/" + label.toLowerCase() + "/patent/" + term;
        
        /* redirect to new tab with 'search' string */
        var win = window.open(search, '_blank');
        if (win) {
            /* Browser has allowed it to be opened */
            win.focus();
        } else {
            /* Browser has blocked it */
            alert('Please allow popups for this website');
        }
      } 
    }
  };

  /* Set animation for Pie Chart to 4 seconds */
  Chart.defaults.global.animation.duration = 4000;

  /* Render Pie Chart to <canvas> id=elementId */
  var pieChart = document.getElementById(elementId).getContext('2d');
  new Chart(pieChart, {
    type: 'pie',
    data: {
      datasets: [{
        data: values,
        backgroundColor: palette,
        borderColor: "black",
        hoverBorderColor: "white",
        hoverBorderWidth: 4
      }],
      labels: labels
    },
    options: {
      responsive: true,
      onClick: pieClickEvent,
      title: {
        display: true,
        text: title,
        fontFamily: "'Raleway', sans-serif",
        fontColor: "white",
        fontSize: 36,
      },
      legend: {
        labels: {
          fontFamily: "'Roboto Condensed', sans-serif",
          fontColor: 'white',
          fontSize: 18
        }
      },
      tooltips: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        bodyFontSize: 18,
        bodyFontColor: "black"
      }
    }
  });
};

/* Main Block of file='graph.js' */
$(document).ready(function() {
  getPatentMetrics(["Categories, Centers"])
    .then((data) => {
      let categories = data.metrics.categories
      let categoryLabels = Object.keys(categories)
      let categoryValues = Object.values(categories)
      makeBarChart(
        "categories-bar-chart",
        "Number of Patents Per Portfolio Category",
        "Category",
        "Number of Patents",
        categoryLabels,
        categoryValues,
        barColorPalette_Categories
      );
      
      let centers = data.metrics.centers
      let centerLabels = Object.keys(centers)
      let centerValues = Object.values(centers)
      makePieChart(
        "centers-pie-chart",
        "Number of Patents Per NASA Field Center",
        centerLabels,
        centerValues,
        pieColorPalette_Centers
      );
        
    })
    .catch(err => {
      console.log(err)
    })
});
