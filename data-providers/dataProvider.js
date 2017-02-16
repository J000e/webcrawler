var exports = module.exports = {};

exports = function(provider) {
	return {
		getAllCars : function() {
			return provider.getAllCars(callback);
		},
		getCar : function(id) {
			return provider.getCar(id, callback);
		}
	}
}