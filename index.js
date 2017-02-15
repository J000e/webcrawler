var express = require('express');
var app     = express();
var httpProvider = require('./data-provider/httpProvider');
var dataProvider = require('./data-provider/dataProvider')(httpProvider);
var carProcessor = require('./processor/carArrayProcessor');




function refreshFromWeb(req, resp) {
  dataProvider.getAllCars(function(carArray) {

    let processed = carProcessor.process(carArray);
    persistence.saveCars(processed);

    resp.send('');
  });
};





/*
app.get('/', handleDatabase);

app.get('/refresh/web', refreshFromWeb);
*/
//refreshFromWeb({}, {send:function(){}});




app.listen(3000);
console.log('App started and listening on localhost:3000');