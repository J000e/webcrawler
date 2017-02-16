var exports = module.exports = {};

exports = function(provider) {
	return {
		saveCar : function(car) {
			return provider.saveCar(car);
		},
		saveCars : function(cars) {
			return provider.saveCars(cars);
		},
		getCar : function(id) {
			return provider.openCar(id);
		},
		getAllCars : function(opt_filter) {
			return provider.getAllCars(opt_filter);
		}
	}
};