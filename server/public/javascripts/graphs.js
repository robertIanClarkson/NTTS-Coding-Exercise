const barPattern = [
  "#b65de2",
  "#7ee100",
  "#761acd",
  "#01f15d",
  "#7b36e3",
  "#b2de3e",
  "#e54bfc",
  "#52ca4a",
  "#ee26df",
  "#ffa703",
  "#0252e2",
  "#ff660e",
  "#0069fb",
  "#ba0011",
  "#5972ff",
  "#ff4a45",
  "#0044c6",
  "#ff1f59",
  "#8060e7",
  "#ff44d4",
  "#882eb1",
  "#ff5de4",
  "#b500be",
  "#da33ac",
  "#d46bff",
  "#c300b1",
  "#ff66fd",
  "#c032b2",
  "#c952d3",
  "#df4eca"
]

const piePattern = [
  "#b65de2",
  "#7ee100",
  "#761acd",
  "#01f15d",
  "#7b36e3",
  "#b2de3e",
  "#e54bfc",
  "#52ca4a",
  "#ee26df",
  "#ffa703",
  "#0252e2",
  "#ff660e",
  "#0069fb",
  "#ba0011",
  "#5972ff",
  "#ff4a45",
  "#0044c6",
  "#ff1f59",
  "#8060e7",
  "#ff44d4",
  "#882eb1",
  "#ff5de4",
  "#b500be",
  "#da33ac",
  "#d46bff",
  "#c300b1",
  "#ff66fd",
  "#c032b2",
  "#c952d3",
  "#df4eca"
]


function getMetrics(metrics) {
  return new Promise((resolve, reject) => {
    $.post("metrics", { metrics })
      .then((data, status) => {
        if(status == 'success') {
          resolve(data)
        } else {
          reject(`Failed POST request for patent metrics '${metrics}': ${status}`)
        }
      })
      .catch((err) => {
        reject(`Failed POST request for patent metrics '${metrics}': ${err}`)
      })
  })
}

function makeBar(elementId, title, xlabel, yLabel, labels, values) {

  function barClickEvent(event, array){
    if(array.length != 0){
      let index = array[0]._index;
      let label = labels[index];
      let search = "https://technology.nasa.gov/search/aw/patent/" + label;
      var win = window.open(search, '_blank');
      if (win) {
          //Browser has allowed it to be opened
          win.focus();
      } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
      }
    }
  }

  Chart.defaults.global.animation.duration = 4000;

  var bar_ctx = document.getElementById(elementId).getContext('2d');
  backgroundColors = []
  for(let i = 0; i < labels.length; i++) {
    backgroundColor = bar_ctx.createLinearGradient(0, 0, 0, 1000);
    backgroundColor.addColorStop(0.0, barPattern[i])
    backgroundColor.addColorStop(0.5, barPattern[i+1])
    backgroundColor.addColorStop(1.0, barPattern[i+2])
    backgroundColors.push(backgroundColor)
  }

  var barChart = document.getElementById(elementId).getContext('2d');
  new Chart(barChart, {
    curvature: 1,
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: xlabel,
        data: values,
        backgroundColor: backgroundColors,
        hoverBorderColor: "white",
        hoverBorderWidth: 4
      }]
    },
    options: {
      onClick: barClickEvent,
      responsive: true,
      title: {
        display: true,
        text: title,
        fontColor: "white",
        fontSize: 36,
        fontFamily: "'Roboto'"
      },
      legend: {
        display: false
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
            labelString: xlabel,
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
            fontColor: "white",
            fontSize: 18
          },
          scaleLabel: {
            display: true,
            labelString: yLabel,
            fontColor: "#ba0011",
            fontSize: 24,
          },
          gridLines: {
            color: '#0B3D91'

          }
        }],
      }
    }
  });
}

function makePie(elementId, title, labels, values) {
  function pieClickEvent(event, array) {
    if(array.length != 0) {
      let index = array[0]._index;
      let label = labels[index];
      let term = prompt("Please enter a search term", "Engines");
      if (term != null && term != "") {
        let search = "https://technology.nasa.gov/search/" + label.toLowerCase() + "/patent/" + term;
        var win = window.open(search, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
      } 
    }
  }

  Chart.defaults.global.animation.duration = 4000;

  pie_ctx = document.getElementById(elementId).getContext('2d');
  backgroundColors = []
  for(let i = 0; i < labels.length; i++) {
    backgroundColor = pie_ctx.createLinearGradient(0, 0, 0, 00);
    backgroundColor.addColorStop(0.0, barPattern[i])
    backgroundColor.addColorStop(0.5, barPattern[i+1])
    backgroundColor.addColorStop(1.0, barPattern[i+2])
    backgroundColors.push(backgroundColor)
  }

  var pieChart = document.getElementById(elementId).getContext('2d');
  new Chart(pieChart, {
    type: 'pie',
    data: {
      datasets: [{
        data: values,
        backgroundColor: piePattern,
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
        fontColor: "white",
        fontSize: 36,
        fontFamily: "'Roboto'"
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 18
        }
      }
    }
  })
}

$(document).ready(function() {

  getMetrics(["Categories, Centers"])
    .then((data) => {
      let categories = data.metrics.categories
      let categoryLabels = Object.keys(categories)
      let categoryValues = Object.values(categories)
      makeBar("categories-bar-chart"
        , "Number Of Patents Per Portfolio Category"
        , "Category"
        , "Number Of Patents"
        , categoryLabels
        , categoryValues)
      
      let centers = data.metrics.centers
      let centerLabels = Object.keys(centers)
      let centerValues = Object.values(centers)
      makePie("centers-pie-chart"
        , "Number Of Patents Per NASA Field Center"
        , centerLabels
        , centerValues)
        
    })
    .catch(err => {
      console.log(err)
    })
});
