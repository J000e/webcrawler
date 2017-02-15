var exports = module.exports = {};
var http    = require('http');

exports = function(provider) {
	return {
		getAllCars : function() {
			provider.getAllCars();
		},
		getCar : function(id) {
			provider.getCar(id);
		}
	}
}