var express = require('express');
var router = express.Router();

const https = require('https');

const jsonHandler = require('./api/jsonHandler')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'NTTS Coding Exercise'
  });
});

/* POST metrics */
router.post('/metrics', function(req, res, next) {
  
  /* Get JSON data from NTTP API */
  https.get('https://technology-api.ndc.nasa.gov/api/patent', (apiRes) => {
      let rawDataBuffer = '';

      /* A chunk of data has been received from API. */
      apiRes.on('data', (chunk) => {
        rawDataBuffer += chunk;
      });

      /* Finished getting data from API */
      apiRes.on('end', () => {
        try {
          let jsonData = JSON.parse(rawDataBuffer);
          let metrics = jsonHandler.getPatentMetrics(jsonData);
          res.send(metrics);
        } catch(err) {
          console.log("POST '/metric' Error: " + err);
          res.sendStatus(500)
        }
      });
  }).on("error", (err) => {
    console.log("POST '/metric' Error: " + err.message);
    res.sendStatus(502)
  });
});

module.exports = router;
