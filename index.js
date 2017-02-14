var mysql   = require('mysql');
var express = require('express');
var http    = require('http');
var _       = require('lodash');
var dbCred  = require('./dbCredentials');
var props   = require('./properties');
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

    connection.commit(function(err) {
      return connection.rollback(function() {
        throw err;
      });

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
  http.get(props.url, res => {
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
        let filtered = _.filter(parsedData.Cars, function(car) {
          return !(car.makeID == 318 || //equipments
                 car.makeID == 488); //scrap
        });
        updateCars(filtered || []);
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

    console.log(currentCar);
    //saveCar(currentCar, new Date());
  });
}

function saveCar(car, date) {
  let carsSql = 'insert into Cars(id, make, model, body, milage, year, is_active, image, price_history) ' +
      'select ?, ?, ?, ?, ?, ?, ?, ?, ? from dual ' + 
      'where not exists (select * from Cars where id = ?);'

  console.log('save in progress', car);
  dbCall(carsSql, function(rows) {console.log(rows)});
  console.log('car saved');
}
/*
app.get('/', handleDatabase);

app.get('/refresh/web', refreshFromWeb);
*/
refreshFromWeb({}, {send:function(){}});
app.listen(3000);
console.log('App started and listening on localhost:3000');