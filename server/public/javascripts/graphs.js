const fillPattern = ["#9100ab",
"#ba1500",
"#0060ec",
"#e000c6",
"#ab65d1",
"#b155ff",
"#80a000",
"#ed4cfc",
"#01e950",
"#10ffa7"]


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

  var barChart = document.getElementById(elementId).getContext('2d');
  new Chart(barChart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: xlabel,
        data: values,
        backgroundColor: "#A6E0DE",
        borderColor: "#FFFFFF",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: xlabel
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: yLabel
          }
        }],
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        }
      }
    }
  });
}

function makePie(elementId, title, labels, values) {
  var pieChart = document.getElementById(elementId).getContext('2d');
  new Chart(pieChart, {
    type: 'pie',
    data: {
      datasets: [{
        data: values,
        backgroundColor: fillPattern,
        label: 'Dataset 1'
      }],
      labels: labels
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title
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
