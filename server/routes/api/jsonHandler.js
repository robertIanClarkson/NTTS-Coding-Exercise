/**
 * Description: get the 'Category' and 'Center' metrics.
 * @param  {JSON} jsonData Data from NTTP API in JSON form.
 * @return {Object} Returns an Object containing the metrics of the NTTP API.
 */
function getMetrics(jsonData) {

  /* Create maps to store frequency */
  let categories = new Map();
  let centers = new Map();
  
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
  getMetrics
}