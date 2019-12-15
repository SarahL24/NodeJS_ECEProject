const mongoose = require('mongoose');

export class UserMongo{
    // Schema for user
    public static userSchema = new mongoose.Schema({
        email :  { type: String, require: true},
        password : { type: String, require: true},
        metrics : [{
            date : { type: Date, require: true},
            value : { type: Number, require: true},
        }]
    });
    
    // Model for user
    public userModel = mongoose.model('User', UserMongo.userSchema);
}