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
var express = require("express");
var mongodb_1 = require("../mongoose/mongodb");
var users_1 = require("./users");
var metrics_1 = require("./metrics");
var path = require("path");
var mongoDB = new mongodb_1.MongoDB();
mongoDB.connect();
var app = express();
var auth = require('./auth');
var port = process.env.PORT || '8080';
var dbUsr = new users_1.UsersHandler();
var dbMet = new metrics_1.MetricsHandler();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded());
app.use(express.json());
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('credentials.ejs');
});
app.get('/home', function (req, res) {
    res.redirect('/');
});
app.get('/home/:token', auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userID;
    return __generator(this, function (_a) {
        token = req.params.token;
        userID = req.userID;
        dbUsr.find(userID, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result === null) {
                console.log("Unable to find user, token may be invalid");
                res.status(400).send("Unable to find user, token may be invalid");
            }
            else {
                var myUser = result;
                res.render('home.ejs', { user: myUser, token: req.params.token });
            }
        });
        return [2 /*return*/];
    });
}); });
app.post('/user/signup', function (req, res) {
    var userToSave = new users_1.User(req.body.email, req.body.password, []);
    dbUsr.signup(userToSave, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to save user");
            res.redirect('/');
        }
        else {
            var token = result;
            res.redirect("/home/" + token);
        }
    });
});
app.post('/user/login', function (req, res) {
    var userToLog = new users_1.User(req.body.email, req.body.password, []);
    dbUsr.login(userToLog, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to find user");
            res.redirect('/');
        }
        else {
            var token = result;
            res.redirect("/home/" + token);
        }
    });
});
app.post('/user/delete/:token', auth, function (req, res) {
    var token = req.params.token;
    var userID = req.userID;
    dbUsr.find(userID, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to find user, token may be invalid");
            res.status(400).send("Unable to find user, token may be invalid");
        }
        else {
            var userToDelete = result;
            dbUsr.delete(userToDelete, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result === null) {
                    console.log("Unable to delete user");
                    res.redirect("/home/" + token);
                }
                else {
                    console.log("User successfully deleted");
                    res.redirect('/');
                }
            });
        }
    });
});
app.post('/user/update/:token', auth, function (req, res) {
    var token = req.params.token;
    var userID = req.userID;
    dbUsr.find(userID, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to find user, token may be invalid");
            res.status(400).send("Unable to find user, token may be invalid");
        }
        else {
            var userToUpdate = result;
            var userUpdated = new users_1.User(req.body.newEmail, req.body.newPassword, []);
            dbUsr.update(userToUpdate, userUpdated, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result === null) {
                    console.log("Unable to update user");
                    res.redirect("/home/" + token);
                }
                else {
                    var myUser = result;
                    console.log("User successfully updated");
                    res.redirect("/home/" + token);
                }
            });
        }
    });
});
app.post('/metrics/add/:token', auth, function (req, res) {
    var token = req.params.token;
    var userID = req.userID;
    dbUsr.find(userID, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to find user, token may be invalid");
            res.status(400).send("Unable to find user, token may be invalid");
        }
        else {
            var userToUpdate = result;
            var now = new Date();
            var metric = new metrics_1.Metric('', req.body.value, now);
            dbMet.add(userToUpdate, metric, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result === null) {
                    console.log("Unable to add metric to user");
                    res.redirect("/home/" + token);
                }
                else {
                    var addedMetric = result;
                    console.log("Metric successfully added");
                    res.redirect("/home/" + token);
                }
            });
        }
    });
});
app.post('/metrics/delete/:token', auth, function (req, res) {
    var token = req.params.token;
    var userID = req.userID;
    dbUsr.find(userID, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === null) {
            console.log("Unable to find user, token may be invalid");
            res.status(400).send("Unable to find user, token may be invalid");
        }
        else {
            var userToUpdate = result;
            var metricID = req.body.metricID;
            dbMet.delete(userToUpdate, metricID, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result === null) {
                    console.log("Unable to delete metric to user");
                    res.redirect("/home/" + token);
                }
                else {
                    var deletedMetricID = result;
                    console.log("Metric successfully deleted");
                    res.redirect("/home/" + token);
                }
            });
        }
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
