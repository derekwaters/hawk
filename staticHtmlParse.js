const rp = require('request-promise');
const cheerio = require('cheerio');

const staticHtmlParse = function(name, site, url, pattern) {
  return rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      var price = null;
      $(pattern).each(function() {
        price = parseFloat($(this).text().replace(/[\$\,]/g, ""));
      });
      return {
        name: name,
        site: site,
        price: price
      };
    })
    .catch(function(err) {
      console.log('An error occurred downloading the page');
      return null;
    });
};

module.exports = staticHtmlParse;