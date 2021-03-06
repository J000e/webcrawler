var exports = module.exports = {};
var _       = require('lodash');
var currencyProvider = require('../data-providers/currency-provider');

var nonCarIds = [318, 488];

function justCars(car) {
  return nonCarIds.indexOf(car.makeID) > -1;
}

function updateCars(cars) {

  _.each(cars, function(car) {
    let currentCar = {
      id            : car.carID,
      make          : car.makeEn,
      model         : car.modelEn,
      body          : car.bodyEn,
      milage        : car.milage,
      year          : car.year,
      is_active     : true,
      image         : car.image,
      price_history : car.carID,
      price  : car.AuctionInfo.currentPrice * currencyProvider.getExchange('AED', 'HUF')
    };

    console.log(currentCar);
    //saveCar(currentCar, new Date());
  });
}

exports.process = (carArray) => {
  let filtered = _.filter(carArray, justCars);
  //todo: call something like updateCars, but with _.map
  return filtered;
};

exports.calculatePersistence = (processedCars, persistedCars) => {
  let idsToClose = _.map(persistedCars, function(car) {
    return car.carID;
  });
  let toUpdate = [];
  let toCreate = [];

  _.each(processedCars, function(car) {
    
  });

  return {
    idsToClose : idsToClose,
    toUpdate   : toUpdate,
    toCreate   : toCreate
  };
};
