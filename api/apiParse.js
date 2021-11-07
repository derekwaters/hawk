const axios = require('axios');

const apiParse = function(name, site, apiUrl, method, postData, jsonTransform) {
  return axios({
    method: method,
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    data: postData
  })
  .then(function(response) {
    var price = jsonTransform(response.data);
    return {
      name: name,
      site: site,
      price: price
    }
  })
  .catch((error) => {console.log('An error occurred: ' + error); return null;} );
};

module.exports = apiParse;
