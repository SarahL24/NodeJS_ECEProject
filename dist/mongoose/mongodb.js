"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
//======================= Mongo Config ====================//
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        var _this = this;
        this.options = {
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        this.connect = new Promise(function (resolve, reject) {
            console.log('Connection to MongoDB...');
            mongoose.connect("mongodb://localhost:27017/nodeProject", _this.options)
                .then(function () {
                console.log('MongoDB is connected to localhost');
                resolve(_this);
            })
                .catch(function (err) {
                console.log('Unable to connect to local MongoDB, trying to reach mongo container');
                mongoose.connect("mongodb://mongo:27017/nodeProject", _this.options)
                    .then(function () {
                    console.log('MongoDB is connected to mongo container');
                    resolve(_this);
                })
                    .catch(function (err) {
                    console.log('Unable to connect to the container MongoDB.');
                    console.log(err);
                    reject(_this);
                });
            });
        });
    }
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//======================= End of Mongo Config ====================//
