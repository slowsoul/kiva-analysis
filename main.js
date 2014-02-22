var express = require('express'),
    connect = require('connect'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || require('./credentials').MONGO_PASSWORD, 
    connection_string = 'mongodb://admin:' + MONGO_PASSWORD + '@ds027699.mongolab.com:27699/is429-todo';
 
app.set('port', process.env.PORT || 3000);
app.use(connect.compress());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(__dirname + '/'));
 
// MongoDB Connection and Collections

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.get('/loansByCountry', function(req, res) {
    // Todos returned as an array of todo objects
    MongoClient.connect(connection_string, function(err, db) {
    var kiva_collection = db.collection('kiva');
      
    kiva_collection.aggregate(
        {$group: {_id:"$Country", totalLoan: {$sum: "$loan_amount"}}},
        function(err,result){
          //console.log(result);
          res.json(result);
          db.close();
        });
    });   
});

app.listen(process.env.PORT||3000, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;