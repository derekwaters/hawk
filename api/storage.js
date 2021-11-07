const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })



/*

PUT item_prices
{
  "settings": {
    "number_of_replicas": 0,
    "number_of_shards": 1
  }, 
  "mappings" : {
    "properties" : {
      "@timestamp" : {
        "type": "date"
      },
      "itemId" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "price" : {
        "type" : "float"
      },
      "sourceName" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      }
    }
  }
}

*/


const Storage = {
  /*
  getItemSources: function (item) {
    return client.search({
      index: 'item_sources',
      body: {
        query: { }
      }
    });
  },
  setItemSources: function (itemTree) {
    for (var i = 0; i < itemTree.length; i++) {
      var item = itemTree[i];
      for (var s = 0; s < item.sites.length; s++) {
        var site = item.sites[s];

        setItemSource(
          item.product, 
          site.name, 
          site.url,
          site.pattern, 
          site.api,
          site.method,
          site.postData)
      }
      for ()
    }
    return client.search({
      index: 'item_sources',
      body: {
        query: { }
      }
    });
  },
  */
  getMinimumPrices: function () {
    return client.search({
      index: 'item_prices',
      body: {
        size: 0,
        aggs: {
          byItem: {
            terms: {
              field: "itemId.keyword"
            },
            aggs: {
              minPrice: {
                min: {
                  field: "price"
                }
              }
            }
          }
        }
      }
    });
  },
  setItemPrice: function (item, source, price) {
    return client.index({
      index: 'item_prices',
      body: {
        itemId: item,
        sourceName: source,
        '@timestamp' : new Date(),
        price: price
      }
    });
  }
};

module.exports = Storage;

