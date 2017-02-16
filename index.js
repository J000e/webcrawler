var express      = require('express');
var http         = require('./data-providers/httpProvider.js');
var file         = require('./data-providers/fileProvider.js');
var dataProvider = require('./data-providers/dataProvider.js')(file);
//var dataProvider = require('./data-provider/dataProvider')(http);
var carProcessor = require('./processor/carArrayProcessor.js');
var mysql        = require('./persistence/mysqlPersistence.js');
var debug        = require('./persistence/debugPersistence.js');
//var persistence  = require('./persistence/persistence.js')(debug);
var persistence  = require('./persistence/persistence')(mysql);

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
    active : true
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
refreshFromWeb({}, {send:function(){}});


//console.log(dataProvider.getAllCars());

//app.listen(3000);
console.log('App started and listening on localhost:3000');