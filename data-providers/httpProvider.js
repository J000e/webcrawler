var exports = module.exports = {};
var http    = require('http');
var q       = require('q');
var props   = require('../resources/properties');

var urlPattern = /^(.*)(:(\w+))(.*)$/;

exports.getAllCars = function() {
    return sendGet(props.getAllCarUrl);
}

exports.getCar = function(id) {
  return sendGet(props.getCarByIdUrl, {
  	id : id
  });
}

function sendGet(url, properties) {
  let deferred = Q.defer();

  http.get(resolveUrl(url, properties), res => {
    if (res.statusCode !== 200) {
      res.resume();
      deferred.reject(new Error(res));
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
      	deferred.resolve(JSON.parse(rawData))
      } catch (e) {
        deferred.reject(e);
      }
    });
  });

  return deferred.promise;
}

function resolveUrl(url, properties) {
  if (! properties) {
  	return url
  }

  let processed = urlPattern.exec(url);

  return processed[1] + properties[processed[3]] + properties[4];
}