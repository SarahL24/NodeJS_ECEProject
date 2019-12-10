"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//======================= Mongo Config ====================//
var options = {
    autoIndex: false,
    reconnectTries: 3,
    reconnectInterval: 500,
    poolSize: 10,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
var connectWithRetry = function () {
    console.log('MongoDB connection to localhost...');
    mongoose.connect("mongodb://localhost:27017/company", options).then(function () {
        console.log('MongoDB is connected to localhost');
    }).catch(function (err) {
        console.log('Unable to connect to localhost, trying to connect to mongo container');
        connectWithRetryContainer;
        //console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        //setTimeout(connectWithRetry, 5000)
    });
};
var connectWithRetryContainer = function () {
    console.log('MongoDB connection to mongo container...');
    mongoose.connect("mongodb://mongo:27017/company", options).then(function () {
        console.log('MongoDB is connected to mongo container');
    }).catch(function (err) {
        console.log('MongoDB connection unsuccessful');
        //setTimeout(connectWithRetryContainer, 5000)
    });
};
connectWithRetry();
var connection = mongoose.connection;
//======================= End of Mongo Config ====================//
//======================= Mongo Tests ============================//
/*
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("employees", function(err: Error, collection: any){
        collection.find({}).toArray(function(err: Error, data: any){
            console.log("here is the data : ");
            console.log(data); // it will print your collection data
        })
    });
});
*/
//======================= End of Mongo Tests =======================//
//import bodyparser = require('body-parser')
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '8080';
var path = require("path");
app.use(express.static(path.join(__dirname, '../public')));
//app.use(bodyparser.json())
//app.use(bodyparser.urlencoded())
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('./partials/description.ejs');
});
app.get('/hello/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
});
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('ok');
    });
});
app.get('/metrics/', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.get('/metrics/:id', function (req, res) {
    dbMet.getOne(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.delete('/metrics/:id', function (req, res) {
    dbMet.deleteOne(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.delete('/metrics/', function (req, res) {
    dbMet.deleteAll(function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
