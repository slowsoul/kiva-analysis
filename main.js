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
          {$group: {_id:"$sector", loan_count: {$sum : 1}, total_loan: {$sum: "$loan_amount"}, average_loan: {$avg: "$loan_amount"}}},
          {$sort: {loan_count : -1}}
        ],
        function(err,result){
          //console.log(JSON.stringify(result, null, 2));
          res.json(result);
          db.close();
        });
    });   
});

app.get('/loansBySectorUganda', function(req, res) {
    MongoClient.connect(connection_string, function(err, db) {
    var collection = db.collection(collectionName);
      
    collection.aggregate(
        [
          {$match: {country : "Uganda"}},
          {$group: {_id:"$sector", loan_count: {$sum : 1}, total_loan: {$sum: "$loan_amount"}, average_loan: {$avg: "$loan_amount"}}},
          {$sort: {loan_count: -1}}
        ],
        function(err,result){
          //console.log(JSON.stringify(result, null, 2));
          res.json(result);
          db.close();
        });
    });   
});

app.get('/borrowerLender', function(req, res) {
    MongoClient.connect(connection_string, function(err, db) {
    var collection = db.collection(collectionName);
    var start = new Date(1970, 1, 1);
    collection.aggregate(
        [
          {$match: {posted_date: {$gt: start}}},
          {$project: {post_year: {$year: "$posted_date"}, borrower_count: 1, lender_count: 1, _id: 0}},
          {$group: {_id: "$post_year", avg_borrower: {$avg: "$borrower_count"}, avg_lender: {$avg: "$lender_count"}}},
          {$sort: {_id : 1}}
        ],
        function(err,result){
          //console.log(JSON.stringify(result, null, 2));
          res.json(result);
          db.close();
        });
    });   
});

app.get('/paidPercent', function(req, res) {
    MongoClient.connect(connection_string, function(err, db) {
    var collection = db.collection(collectionName);
    var start = new Date(1970, 1, 1), end = new Date(2009, 1, 1);
    collection.aggregate(
        [
          {$match: {posted_date: {$gt: start, $lt: end}}},
          {$project: {post_year: {$year: "$posted_date"}, status: 1, _id: 0}},
          {$group: {_id: "$post_year", paid_loan_count: {$sum: { $cond: [ { $eq: [ "$status", "paid" ] } , 1, 0 ] }}, loan_count: {$sum: 1}}},
          {$project: {_id: 1, paid_percentage: {$divide: ["$paid_loan_count", "$loan_count"]}}},
          {$sort: {_id : 1}}
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