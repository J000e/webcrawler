var exports = module.exports = {};
var mysql   = require('mysql');
var dbCred  = require('../resources/dbCredentials');
var pool    = mysql.createPool(dbCred);


exports.dbCall = function dbCall(query, callbackFn) {
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
};

exports.handleDatabase = function handleDatabase(req, res) {
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

exports.saveCar = function saveCar(car, date) {
  let carsSql = 'insert into Cars(id, make, model, body, milage, year, is_active, image, price_history) ' +
      'select ?, ?, ?, ?, ?, ?, ?, ?, ? from dual ' + 
      'where not exists (select * from Cars where id = ?);'

  console.log('save in progress', car);
  dbCall(carsSql, function(rows) {console.log(rows)});
  console.log('car saved');
};