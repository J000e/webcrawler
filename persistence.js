var exports = module.exports = {};
var pool    = mysql.createPool(dbCred);
var mysql   = require('mysql');
var dbCred  = require('./dbCredentials');

exports = function(provider) {
	return {
		saveCar : function(car) {
			provider.saveCar(car);
		},
		getCar : function(id) {
			provider.openCar(id);
		},
		getAllCars : function(opt_filter) {
			provider.getAllCars(opt_filter);
		}
	}
};