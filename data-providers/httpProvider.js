var exports = module.exports = {};
var http    = require('http');
var props   = require('../resources/properties');


exports.getAllCars = function(callback) {
  http.get(props.url, res => {
    if (res.statusCode !== 200) {
      console.log('Error hapened', res);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        callback(JSON.parse(rawData));
      } catch (e) {
        console.log('error', e.message);
      }
    });
  });
}