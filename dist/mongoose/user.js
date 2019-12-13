"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var UserMongo = /** @class */ (function () {
    function UserMongo() {
        // Model for user
        this.userModel = mongoose.model('User', UserMongo.userSchema);
    }
    // Schema for user
    UserMongo.userSchema = new mongoose.Schema({
        email: { type: String, require: true },
        password: { type: String, require: true },
        metrics: [{
                date: { type: Date, require: true },
                value: { type: Number, require: true },
            }]
    });
    return UserMongo;
}());
exports.UserMongo = UserMongo;
