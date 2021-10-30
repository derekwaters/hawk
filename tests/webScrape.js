const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const rp = require('request-promise');

//const url = 'https://www.eands.com.au/fisher-paykel-rf605qduvx2-538l-stainless-steel-quad-door-fridge';


rp(url)
  .then(function(html){
    //success!
    //console.log(html);
    const $ = cheerio.load(html);
    $('.price-wrapper .price').each(function() {
       console.log('Price: ' + $(this).text());
    });
  })
  .catch(function(err){
      //handle error
      console.log('Error: ' + err);
  });





/*
puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      console.log('Here we are then');
      console.log(page.content());
      return page.content();
    });
  })
  .then(function(html) {
    console.log('aaaaa');
    console.log(html);
  })
  .catch(function(err) {
    console.log('got an error: ');
    console.log(err);
    //handle error
    //  
  });
*/

console.log('All done');
