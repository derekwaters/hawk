const axios = require('axios');

var url = 'https://www.reece.com.au/trsonline/products/prices/batch';

var postDataString = '{"customerId":null,"postCode":"3161","products":[{"productCode":"9506615","packs":["PACK1","PACK2"]}]}';

var extractPrice = (data) => data.prices[0].cmp.PACK1.gstInclusive;

makeApiCall(url, 'post', postDataString)
.then(response => console.log(extractPrice(response.data)))
.catch(error => console.log('An error occurred: ' + error));


function makeApiCall (url, method, data, parseResponseFn) {
	return axios({
	  method: method,
	  url: url,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  data: data
	});
}

/*
function makeApiCall (url, method, data, parseResponseFn) {
	axios({
	  method: method,
	  url: url,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  data: data
	})
	.then(response => { return parseResponseFn(response.data); })
	.catch(error => { console.log(error); });
}
*/
