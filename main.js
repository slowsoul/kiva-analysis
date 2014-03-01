var express = require('express'),
    connect = require('connect'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || require('./credentials').MONGO_PASSWORD, 
    connection_string = 'mongodb://admin:' + MONGO_PASSWORD + '@ds027699.mongolab.com:27699/is429-todo',
    collectionName = 'kiva-part';
 
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
    MongoClient.connect(connection_string, function(err, db) {
    var collection = db.collection(collectionName);
      
    collection.aggregate(
        [
          {$group: {_id:"$country", loanCount: {$sum : 1}, totalLoan: {$sum: "$loan_amount"}, averageLoan: {$avg: "$loan_amount"}}},
          {$sort: {totalLoan : -1}}
        ],
        function(err,result){
          //console.log(result);
          res.json(result);
          db.close();
        });
    });   
});

app.get('/loansBySector', function(req, res) {
    MongoClient.connect(connection_string, function(err, db) {
    var collection = db.collection(collectionName);
      
    collection.aggregate(
        [
          {$group: {_id:"$sector", loanCount: {$sum : 1}, totalLoan: {$sum: "$loan_amount"}, averageLoan: {$avg: "$loan_amount"}}},
          {$sort: {totalLoan : -1}}
        ],
        function(err,result){
          //console.log(JSON.stringify(result, null, 2));
          res.json(result);
          db.close();
        });
    });   
});

app.listen(process.env.PORT||3000, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;