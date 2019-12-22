"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../mongoose/user");
var jwt = require("jsonwebtoken");
var User = /** @class */ (function () {
    function User(email, password, metrics) {
        this.email = email;
        this.password = password;
        this.metrics = metrics;
    }
    return User;
}());
exports.User = User;
var UsersHandler = /** @class */ (function () {
    function UsersHandler() {
        var _this = this;
        this.userMongo = new user_1.UserMongo();
        this.userModel = this.userMongo.userModel;
        // Sign up and save
        this.signup = function (userToSave, callback) { return __awaiter(_this, void 0, void 0, function () {
            var toSave, errorTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toSave = true;
                        errorTest = 0;
                        return [4 /*yield*/, this.userModel.find().exec(function (err, users) {
                                if (err)
                                    return console.log(err);
                                users.forEach(function (user) {
                                    if (userToSave.email === user.email) {
                                        console.log('User already exists');
                                        toSave = false;
                                        errorTest = -1;
                                    }
                                    if (userToSave.email === '' || userToSave.password === '') {
                                        console.log('User have no password or email set');
                                        toSave = false;
                                        errorTest = -2;
                                    }
                                });
                                if (toSave === true) {
                                    var doc = new _this.userMongo.userModel();
                                    doc.email = userToSave.email;
                                    doc.password = userToSave.password;
                                    doc.metrics = userToSave.metrics;
                                    doc.save(function (err, user) {
                                        if (err) {
                                            throw err;
                                        }
                                        var token = jwt.sign({ userID: user.id }, 'eceprojectkey');
                                        callback(null, token);
                                    });
                                }
                                else {
                                    callback(null, errorTest);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // Finding the user for logging in
        this.login = function (userToLog, callback) { return __awaiter(_this, void 0, void 0, function () {
            var isFound, userID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isFound = false;
                        userID = -1 // by default, incorrect ID is -1
                        ;
                        return [4 /*yield*/, this.userModel.find().exec(function (err, users) {
                                if (err)
                                    return console.log(err);
                                users.forEach(function (user) {
                                    if (userToLog.email === user.email && userToLog.password === user.password) {
                                        isFound = true;
                                        userID = user.id;
                                    }
                                });
                                if (isFound === true && userID !== -1) {
                                    var token = jwt.sign({ userID: userID }, 'eceprojectkey');
                                    callback(null, token);
                                }
                                else {
                                    callback(null, userID);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // Find a user in db and retrieve it
        this.find = function (userID, callback) { return __awaiter(_this, void 0, void 0, function () {
            var isFound, myUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isFound = false;
                        myUser = {};
                        return [4 /*yield*/, this.userModel.find().exec(function (err, users) {
                                if (err)
                                    return console.log(err);
                                users.forEach(function (user) {
                                    if (userID === user.id) {
                                        isFound = true;
                                        myUser = new User(user.email, user.password, user.metrics);
                                    }
                                });
                                if (isFound === true && myUser !== {}) {
                                    callback(null, myUser);
                                }
                                else {
                                    callback(null, null);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // Delete an user in db
        this.delete = function (userToDelete, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.deleteOne({ email: userToDelete.email }, function (err, user) {
                            if (err) {
                                throw err;
                            }
                            callback(null, userToDelete);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // Update an user email/password in db
        this.update = function (userToUpdate, userUpdated, callback) { return __awaiter(_this, void 0, void 0, function () {
            var toUpdate, errorTest, newEmail, newPassword;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toUpdate = true;
                        newEmail = "";
                        newPassword = "";
                        userUpdated.email === "" ? newEmail = userToUpdate.email : newEmail = userUpdated.email;
                        userUpdated.password === "" ? newPassword = userToUpdate.password : newPassword = userUpdated.password;
                        return [4 /*yield*/, this.userModel.find().exec(function (err, users) {
                                if (err)
                                    return console.log(err);
                                users.forEach(function (user) {
                                    if (newEmail === user.email && newEmail !== userToUpdate.email) {
                                        toUpdate = false;
                                        errorTest = -1;
                                    }
                                });
                                if (toUpdate === true) {
                                    _this.userModel.updateOne({ email: userToUpdate.email }, { email: newEmail, password: newPassword }, function (err, user) {
                                        if (err) {
                                            throw err;
                                        }
                                        var newUser = new User(newEmail, newPassword, userToUpdate.metrics);
                                        callback(null, newUser);
                                    });
                                }
                                else {
                                    callback(null, errorTest);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // drop the database of users
        this.drop = function (callback) { return __awaiter(_this, void 0, void 0, function () {
            var toDrop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toDrop = true;
                        if (!(toDrop === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userModel.deleteMany({}, function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                callback(null, result);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        callback(null, null);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UsersHandler;
}());
exports.UsersHandler = UsersHandler;
