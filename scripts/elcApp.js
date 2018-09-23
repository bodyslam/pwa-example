(() => {
  'use strict';

  const appName = 'CliniquePWA';
  const cacheAvailable = 'caches' in self;
  const productUrl = '/api/products'

  let app = {
    isLoading: true,
    cart: [],
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main')
  };

  function getUrl(url) {
    return fetch(url).then(r => {
      // Stream to text
      console.log('getUrl', r, typeof r)
      return r.text().then(txt => {
        return txt;
      });
    });
  }

  function streamBodyToText(response) {
    console.log('StreamBodyText', response, response.body)
    return response.body.text().then(text => {
      console.log('Text?', text, typeof text)
      return text;
    })
  }

  async function isCacheBuilt(url) {
    console.log('isCacheBuilt')
    if (cacheAvailable) {
      console.log('start matchall')
      return caches.matchAll(url).then(r => {
        console.log('isMatched', url, r)
      });  
    } else {
      console.log("isCacheBuild error! Cache is not available!!")
      process.exit()
    }
  }

  function getProducts() {
    var response;
    return caches.match(productUrl).catch(function() {
      return fetch(productUrl);
    }).then(function(r) {
      response = r;
      caches.open(appName).then(function(cache) {
        cache.put(productUrl, response);
      });  
      return response.clone();
    }).catch(function() {
      return caches.match(productUrl);
    });
  }

  getProducts()
  .then(streamBodyToText)
  .then(f => {
    console.log('F', JSON.stringify(f))
  })
  .catch(e => {
    console.error("Fatal", e)
  })
  

  // ---- Get URL ---
  // getUrl(productUrl).then(products => {
  //   console.log(products)
  // })
 

})()