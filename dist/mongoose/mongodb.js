"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
console.log('Connection to MongoDB...');
var db = mongoose.connect("mongodb://localhost:27017/nodeProject", options)
    .then(function () {
    console.log('MongoDB is connected to localhost');
    //code()
})
    .catch(function (err) {
    console.log('Unable to connect to local MongoDB, trying to reach mongo container');
    db = mongoose.connect("mongodb://mongo:27017/nodeProject", options)
        .then(function () {
        console.log('MongoDB is connected to mongo container');
        //code()
    })
        .catch(function (err) {
        console.log('Unable to connect to the container MongoDB.');
        console.log(err);
    });
});
exports.default = db;
