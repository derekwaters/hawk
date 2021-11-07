
const staticHtmlParse = require('./staticHtmlParse');
const apiParse = require('./apiParse');
const Storage = require('./storage');

var scrapeList = [
{
	"product" : "FRIDGE/FREEZER",
	"sites" : [
		{
			"name" : "E&S",
			"url" : "https://www.eands.com.au/fisher-paykel-rf605qduvx2-538l-stainless-steel-quad-door-fridge",
			"pattern" : ".price-wrapper .price"
		},
		{
			"name" : "Betta",
			"url" : "https://www.betta.com.au/fisher-paykel-605-litre-quad-door-fridge-stainless-steel-814690",
			"pattern" : ".price-wrapper .price"
		}/*,
		{
			"name" : "JB Hifi",
			"url" : "https://www.jbhifi.com.au/products/fisher-paykel-rf605qduvx2-538l-french-door-fridge-stainless-steel",
			"pattern" : ".price"
		}*/
	]
},
{
	"product" : "Hand Towel Ring",
	"sites" : [
		{
			"name" : "Reece Plumbing",
			"api" : "https://www.reece.com.au/trsonline/products/prices/batch",
			"method" : "post",
			"postData" : '{"customerId":null,"postCode":"3161","products":[{"productCode":"9506615","packs":["PACK1","PACK2"]}]}',
			"jsonTransform" : (data => data.prices[0].cmp.PACK1.gstInclusive)
		}
	]
},
{
	"product" : "HOT PLATE",
	"sites" : [
		{ "name" : "E&S", "url": "https://www.eands.com.au/siemens-ex975lvc1e-90cm-iq700-induction-cooktop", "pattern" : ".price-wrapper .price" }
	]
},
{
	"product" : "RANGEHOOD - Sirius",
	"sites" : [
		{ "name" : "E&S", "url": "https://www.eands.com.au/sirius-sl926dl850-85cm-stainless-steel-undermount-rangehood", "pattern" : ".price-wrapper .price" }
	]
},
{
	"product" : "RANGEHOOD - Siemens",
	"sites" : [
		{ "name" : "E&S", "url": "https://www.eands.com.au/siemens-lb89586au-86cm-stainless-steel-undermount-rangehood", "pattern" : ".price-wrapper .price" }
	]
},
{
	"product" : "KITCHEN SINK",
	"sites" : [
		{ "name" : "Appliances Online", "api" : "https://www.appliancesonline.com.au/api/v2/product/slug/oliveri-diaz-sink-dz171?date=2021-10-5", "method" : "get", "postData" : "date=2021-10-5", "jsonTransform" : (data => data.price) },
		{ "name" : "Winning Appliances", "api" : "https://www.winningappliances.com.au/api/product/oliveri-diaz-diaz-double-bowl-right-hand-drainer-topmount-sink-dz171?2021-10-22&location=WA-DC-MEL", "method" : "get", "postData" : "2021-10-22&location=WA-DC-MEL", "jsonTransform" : (data => data.product.price)}
	]
},
{
	"product" : "SINK MIXER (MK1)",
	"sites" : [
		{ "name" : "Reece", "api": "https://www.reece.com.au/trsonline/products/prices/batch", "method":"post", "postData" : '{"customerId":null,"postCode":"3161","products":[{"productCode":"2252111","packs":["PACK1","PACK2"]}]}', "jsonTransform" : (data => data.prices[0].cmp.PACK1.gstInclusive) }
	]
},
{
	"product" : "LAUNDRY SINK",
	"sites" : [
		{ "name" : "Reece", "api": "https://www.reece.com.au/trsonline/products/prices/batch", "method":"post", "postData" : '{"customerId":null,"postCode":"3161","products":[{"productCode":"2408002","packs":["PACK1","PACK2"]}]}', "jsonTransform" : (data => data.prices[0].cmp.PACK1.gstInclusive) }
	]
},
{
	"product" : "VB1 BATHROOM 1",
	"sites" : [
		{ "name" : "Reece", "api": "https://www.reece.com.au/trsonline/products/prices/batch", "method":"post", "postData" : '{"customerId":null,"postCode":"3161","products":[{"productCode":"2351783","packs":["PACK1","PACK2"]}]}', "jsonTransform" : (data => data.prices[0].cmp.PACK1.gstInclusive) }
	]
},
{
	"product" : "VB2 BATHROOM 2",
	"sites" : [
		{ "name" : "Reece", "api": "https://www.reece.com.au/trsonline/products/prices/batch", "method":"post", "postData" : '{"customerId":null,"postCode":"3161","products":[{"productCode":"2350672","packs":["PACK1","PACK2"]}]}', "jsonTransform" : (data => data.prices[0].cmp.PACK1.gstInclusive) }
	]
},
{
	"product" : "MV Mixer Tap - Bathrooms",
	"sites" : [
		// { "name" : "Bunnings", "api": "https://api.prod.bunnings.com.au/v1/products/0056987/fulfillment/6400/radius/100000?isToggled=true", "method":"get", "postData" : 'isToggled=true', "jsonTransform" : (data => data.data.price.value) }
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/maku-basin-mixer-125268/", "pattern" : ".price--withTax" },
		// { "name": "Accent", "url" : "https://accentbathrooms.com.au/products/methven-maku-basin-mixer-sale-last-one", "pattern" : ".product-price" }
	]
},
{
	"product" : "BATH",
	"sites" : [
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/turin-1665-inset-bath-054358/", "pattern" : ".price--withTax" },
	]
},
{
	"product" : "BATH SPOUT",
	"sites" : [
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/maku-wall-mounted-bath-spout-125273/", "pattern" : ".price--withTax" },
	]
},
{
	"product" : "BATH MIXER",
	"sites" : [
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/maku-shower-mixer-125270/", "pattern" : ".price--withTax" },
	]
},
{
	"product" : "SHOWER ROSE (BR01)",
	"sites" : [
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/kiri-overhead-showersatinjet-wall-arm-chrome-120451/", "pattern" : ".price--withTax" },
	]
},
{
	"product" : "SHOWER ROSE (BR02)",
	"sites" : [
		{ "name": "Tradelink", "url" : "https://tradelink.com.au/maku-satinjet-rail-shower-600mm-chrome-125347/", "pattern" : ".price--withTax" },
	]
},
{
	"product" : "SHAVING CABINET",
	"sites" : [
		{ "name": "The Blue Space", "url" : "https://www.thebluespace.com.au/collections/bathroom-mirror-cabinets-and-shaving-cabinets/products/adp-glacier-shaving-cabinet-600mm-1800mm", "pattern" : ".price--main .money" },
	]
}





];

var promises = [];

for (var i = 0; i < scrapeList.length; i++) {
	var product = scrapeList[i];
	for (var s = 0; s < product.sites.length; s++) {
		var site = product.sites[s];
		if (site.url !== undefined) {
			promises.push(staticHtmlParse(product.product, site.name, site.url, site.pattern));
		} else if (site.api !== undefined) {
			promises.push(apiParse(product.product, site.name, site.api, site.method, site.postData, site.jsonTransform));
		}
	}
}


Storage.getMinimumPrices()
.then(function(result) {
	// console.log(result.body.aggregations.byItem.buckets)
	var minPrices = [];
	var i, bucket;
	for (i = 0; i < result.body.aggregations.byItem.buckets.length; i++) {
		bucket = result.body.aggregations.byItem.buckets[i];
		minPrices[bucket.key] = bucket.minPrice.value * 1.0;
	}

	console.log('Previous lowest prices:');
	for (var priceName in minPrices) {
		console.log('   ' + priceName + ': ' + minPrices[priceName]);
	}
	// console.log(minPrices);

	Promise.all(promises)
	.then(function(values) {

		var cheapDeals = [];

		// console.log(values)
		for (var resultKey in values) {
			var result = values[resultKey];
			if (result !== null) {

				result.price = result.price * 1.0;	// Make sure it's a float
				Storage.setItemPrice(result.name, result.site, result.price).
				then();

				if (minPrices[result.name] !== undefined) {
					if (result.price < minPrices[result.name]) {
						console.log("CHEAP DEAL! " + result.name + " is only " + result.price + " at " + result.site);
					}
				}
			}
		}
	});

});
