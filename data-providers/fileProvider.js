var Q = require('q');
var exports = module.exports = {};
var jan_30 = require('../ea_2017_01_30.json');
var feb_10 = require('../ea_2017_02_10.json');

exports.getAllCars = function() {
    var deferred = Q.defer();

    deferred.resolve(jan_30);

    return deferred.promise;
},

exports.getCar = function(id) {
    return undefined;
}
