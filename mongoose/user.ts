//import {Metric} from '../src/metrics'
//import {MetricMongo} from './metric'

var mongoose = require('mongoose');

export class UserMongo{
    // Schema for user
    public userSchema = new mongoose.Schema({
        email :  { type: String, require: true},
        password : { type: String, require: true},
        metrics : [{
            label : { type: String, require: true},
            value : { type: Number, require: true},
        }]
    });
    
    // Model for user
    public userModel = mongoose.model('User', this.userSchema);
}