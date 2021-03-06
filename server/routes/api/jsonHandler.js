/**
 * Description: get the 'Category' and 'Center' metrics.
 * @param  {JSON} jsonData Data from NTTP API in JSON form.
 * @return {Object} Returns an Object containing the metrics of the NTTP API.
 */
function getPatentMetrics(jsonData) {

  /* Check JSON for correct format */
  if(!('results' in jsonData)) {
    throw "getPatentMetrics --> JSON data does not have 'results'";
  } else if(jsonData.results.length == 0) {
    throw "getPatentMetrics --> JSON data has 0 'results'";
  } else if(jsonData.results[0].length != 12) {
    throw "getPatentMetrics --> JSON record in wrong format";
  }

  /* Create maps to store frequency */
  let categories = new Map();
  let centers = new Map();

  console.log(jsonData.results[0].length)

  /* Collect metrics */
  for (i in jsonData.results) {
    let data = jsonData.results[i];

    let category = data[5];
    let center = data[9];

    let category_count = categories.get(category);
    let center_count = centers.get(center);

    categories.set(category, category_count ? category_count+1 : 1);
    centers.set(center, center_count ? center_count+1 : 1);
  }

  return {
    categories: Object.fromEntries(categories),
    centers: Object.fromEntries(centers)
  };
};

module.exports = {
  getPatentMetrics
}