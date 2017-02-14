var mysql   = require('mysql');
var express = require('express');
var http    = require('http');
var _       = require('lodash');
var dbCred  = require('./dbCredentials');
var app     = express();

var pool    = mysql.createPool(dbCred);

function dbCall(query, callbackFn) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({code : 100, status : 'Error in db connection'});
      console.log(err);
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(query, function(err, rows) {
                      connection.release();
                      callbackFn(rows);
                    });
  });
}

function handleDatabase(req, res) {
  let query = 'select * ' +
              '  from Cars c, ' +
              '       Price_History p ' +
              ' where c.price_history = p.id;';

  pool.beginTransaction(function(err) {
    if (err) {
      throw err;
    }

    conneciton.query(query, function(error, result, fields) {
      console.log(arguments);

      connection.commit(function(err) {});
    });

  })
};

function refreshFromWeb(req, resp) {
  http.get('http://api.emiratesauction.com/v2/carsonline', res => {
    if (res.statusCode !== 200) {
      console.log('Error hapened', res);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        updateCars(parsedData.Cars || []);
      } catch (e) {
        console.log('error', e.message);
      }
    });
  });
  resp.send('');
};

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
      price  : car.AuctionInfo.currentPrice * 80
    };

    saveCar(currentCar, new Date());
  });
}

function saveCar(car, date) {
  let carsSql = 'insert into Cars(id, make, model, body, milage, year, is_active, image, price_history) ' +
      'select ?, ?, ?, ?, ?, ?, ?, ?, ? from dual ' + 
      'where not exists (select * from Cars where id = ?);'

  dbCall(carsSql)
}

app.get('/', handleDatabase);

app.get('/refresh/web', refreshFromWeb);

app.listen(3000);
console.log('App started and listening on localhost:3000');
console.log(dbCred);