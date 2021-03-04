

function GetMetrics(jsonData) {

  let categories = new Map()
  let centers = new Map()
  
  for (i in jsonData.results) {
    let data = jsonData.results[i]

    let category = data[5]
    let center = data[9]

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
  GetMetrics
}