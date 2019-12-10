var mongoose = require('mongoose');

export class UserMongo{
// Schema for user
    public userSchema = new mongoose.Schema({
        email :  String,
        password : String,
    });
    
    // Model for user
    public userModel = mongoose.model('user', this.userSchema);
}