var express      = require('express');
var http         = require('./data-provider/httpProvider');
var file         = require('./data-provider/fileProvider');
var dataProvider = require('./data-provider/dataProvider')(file);
//var dataProvider = require('./data-provider/dataProvider')(http);
var carProcessor = require('./processor/carArrayProcessor');
var mysql        = require('./persistence/mysqlPersistence');
var debug        = require('./persistence/debugPersistence');
var persistence  = require('./persistence/persistence')(debug);
//var persistence  = require('./persistence/persistence')(mysql);

var app = express();


function refreshFromWeb(req, resp) {
  dataProvider.getAllCars()
    .then(processCars)
    .then(getPersistedActiveCars)
    .then(persistCars)
    .catch(logError);
  /*
  dataProvider.getAllCars(function(carArray) {

    let persisted = persistence.getAllCars()
    let processed = carProcessor.process(carArray);
    persistence.saveCars(processed);

    resp.send('');
  });*/
};

function processCars(carArray) {
  return carProcessor.process(carArray);
};

function getPersistedActiveCars(processedCars) {
  var filter = {
    active : true;
  }

  persistence.getAllCars(filter).then(function(persistedCars) {
    return {
      processedCars : processedCars,
      persistedCars : persistedCars
    }
  });
};

function persistCars(cars) {
  let processedCars = cars.processedCars;
  let persistedCars = cars.persistedCars;
  let processed     = carProcessor.claculatePersistence(processedCars, persistedCars);
  let carsToClose   = processed.idsToClose;
  let carsToUpdate  = processed.toUpdate;
  let carsToCreate  = processed.toCreate;

  persistence.saveCars(carsToCreate);
  persistence.updateCarPrices(carsToUpdate);

  closeCars(carsToClose);
};

function closeCars(carIds) {
  _.each(carIds, function(id) {
    dataProvider.getCar(id)
      .then(closeCar)
      .catch(logError);
  });
}

function closeCar(carDetails) {
  let toUpdate = {
    isActive : false,
    price    : carDetails.price
  }

  persistence.updateCar(carDetails.carID, toUpdate)
    .catch(logError);
};

function logError(e) {
  console.log(e);
};


/*
app.get('/', handleDatabase);

app.get('/refresh/web', refreshFromWeb);
*/
//refreshFromWeb({}, {send:function(){}});




app.listen(3000);
console.log('App started and listening on localhost:3000');