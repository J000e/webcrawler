module.exports = function(provider) {
  return {

    /**
     * @param car : Car object to persist
     */
    saveCar : function(car) {
      return provider.saveCar(car);
    },

    /**
     * @param car : Array of cars to persist
     */
    saveCars : function(cars) {
      return provider.saveCars(cars);
    },
    getCar : function(id) {
      return provider.openCar(id);
    },
    getAllCars : function(opt_filter) {
      return provider.getAllCars(opt_filter);
    },

    /**
     * prices : Array of {id, price} object
     */
    updateCarPrices : function(prices) {
      return provider.updateCarPrices(prices);
    },

    persist : function persist(carsToCreate, carsToUpdate, carsToClose) {
      return provider.persist(carsToCreate, carsToUpdate, carsToClose);
    }
  };
};