var exports = module.exports = {};

exports = function(provider) {
	return {
		saveCar : function(car) {
			provider.saveCar(car);
		},
		saveCars : function(cars) {
			provider.saveCars(cars);
		},
		getCar : function(id) {
			provider.openCar(id);
		},
		getAllCars : function(opt_filter) {
			provider.getAllCars(opt_filter);
		}
	}
};