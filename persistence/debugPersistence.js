var exports = module.exports = {};
var _ = require('lodash');
var Q = require('q');

var carList = [{
  'carID': 48693,
  'image': 'https:\/\/cdn.emiratesauction.com\/media\/1gdhxhowzr5ii5hh4142qeomulqmml6wtaseyvqm1rrbcl6s9l\/t_,w_[w],h_[h]\/image.jpg',
  'descriptionEn': 'Provided By Court - GCC Specifications - Petrol - As Is',
  'imgCount': 29,
  'sharingLink': 'http:\/\/www.emiratesauction.com\/lofi\/#\/cars\/cars\/online',
  'sharingMsgEn': 'Emirates Auction\n2013 Toyota - Hiace for auction\nLot# 48693\nCurrent Price: AED 1,600\nAuction Ends on 12 Feb 6:00 PM',
  'mileage': '0',
  'makeID': 128,
  'modelID': 59,
  'bodyId': 4,
  'year': 2013,
  'makeEn': 'Toyota',
  'modelEn': 'Hiace',
  'bodyEn': 'VAN',
  'AuctionInfo': {
    'bids': 15,
    'endDate': 147201,
    'endDateEn': '12 Feb 6:00 PM',
    'currencyEn': 'AED',
    'currentPrice': 1600,
    'minIncrement': 100,
    'lot': 48693,
    'priority': 1000,
    'itemid': 48693,
    'isModified': 0
  }
}, {
  'carID': 48709,
  'image': 'https:\/\/cdn.emiratesauction.com\/media\/2lxbi8abzc9c9wzj3u1ztsrzbh91z4m5lklejkuoos0ej550rd\/t_,w_[w],h_[h]\/image.jpg',
  'descriptionEn': 'Provided By Court - GCC Specifications - As Is',
  'imgCount': 46,
  'sharingLink': 'http:\/\/www.emiratesauction.com\/lofi\/#\/cars\/cars\/online',
  'sharingMsgEn': 'Emirates Auction\n2013 Mitsubishi - Canter for auction\nLot# 48709\nCurrent Price: AED 4,000\nAuction Ends on 12 Feb 6:00 PM',
  'mileage': '0',
  'makeID': 82,
  'modelID': 47,
  'bodyId': 9,
  'year': 2013,
  'makeEn': 'Mitsubishi',
  'modelEn': 'Canter',
  'bodyEn': 'PICK-UP',
  'AuctionInfo': {
    'bids': 36,
    'endDate': 147201,
    'endDateEn': '12 Feb 6:00 PM',
    'currencyEn': 'AED',
    'currentPrice': 4000,
    'minIncrement': 100,
    'lot': 48709,
    'priority': 1000,
    'itemid': 48709,
    'isModified': 0
  }
}];

exports.saveCar = function(car) {
  carList.push(car);
};

saveCars = function(cars) {
  _.each(cars, function(car) {
    carList.push(car);
  });

  return cars.length;
};

exports.getCar = function(id) {
  return this.getAllCars({carID : id});
};

exports.getAllCars = function getAllCars(opt_filter) {
  if (! opt_filter) {
    return Q.resolve(carList);
  }

  return Q.resolve(_.filter(carList, function(car) {
    var keep = true;
    _.keys(opt_filter, function(key) {
      keep &= car[key] == opt_filter[key];
    });

    return keep;
  }));
};

function closeCars(cars) {
  return cars.length;
}

function updateCars(cars) {
  return cars.length;
}

exports.persist = function persist(carsToCreate, carsToUpdate, carsToClose) {
  let report = {};

  report.createdNumber = saveCars(carsToCreate);
  report.updateNumber  = updateCars(carsToUpdate);
  report.deleteNumber  = carsToClose.then( cars => closeCars);
  //this.

  return report;
};
