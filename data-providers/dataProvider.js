var exports = module.exports = {};

exports = function(provider) {
	return {
		getAllCars : function(callback) {
			provider.getAllCars(callback);
		},
		getCar : function(id, callback) {
			provider.getCar(id, callback);
		}
	}
}