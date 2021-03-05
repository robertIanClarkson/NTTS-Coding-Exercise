var express = require('express');
var router = express.Router();

const https = require('https');

var jsonHandler = require('./api/jsonHandler')

/* GET home page. */
router.get('/', function(req, res, next) {
  https.get('https://technology-api.ndc.nasa.gov/api/patent', (resp) => {
    let rawDataBuffer = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      rawDataBuffer += chunk;
    });

    resp.on('end', () => {
      let jsonData = JSON.parse(rawDataBuffer);
      let metrics = jsonHandler.GetMetrics(jsonData);

      res.render('index', { 
        title: 'NTTS Coding Excercise',
        categories: metrics.categories,
        centers: metrics.centers
      });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

router.post('/metrics', function(req, res, next) {
  
  console.log(req.body['metrics[]'])
  
  https.get('https://technology-api.ndc.nasa.gov/api/patent', (resp) => {
    let rawDataBuffer = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      rawDataBuffer += chunk;
    });

    resp.on('end', () => {
      let jsonData = JSON.parse(rawDataBuffer);
      let metrics = jsonHandler.GetMetrics(jsonData);

      res.send({
        metrics: metrics
      });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

module.exports = router;
