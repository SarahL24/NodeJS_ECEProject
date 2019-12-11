import {UserMongo} from '../mongoose/user';
import jwt = require('jsonwebtoken');


var userMongo = new UserMongo();
var userModel = userMongo.userModel;
var query = userModel.find();
query.collection(userModel.collection);

export class User {

    public email: string;
    public password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
}

export class UsersHandler{

    // Saving
    public save = (userToSave: User, callback: any) => {

        var toSave = true;

        query.find().exec(function(err: Error, users: any){
            if(err)
               return console.log(err);
            users.forEach(function(user: any){
               if(userToSave.email === user.email){
                    console.log('User already exists');
                    toSave = false;
                    callback(null, null);
               }
            });

            if(toSave === true){
                var myUserModel = new userModel(userToSave);
                const token = jwt.sign({ user: userToSave }, 'eceprojectkey');
                console.log(token);

                myUserModel.save(function (err: Error) {
                    if (err) { throw err; }
                });
                callback(null, {userToSave, token})
            }
         });
    }

    // Finding the user for logging in
    public login = (userToLog: User, callback: any) => {

        var email = userToLog.email
        var password = userToLog.password

        var findUser = function(callback: any){
            userModel.findOne({
                email: email,
                password: password,
            },
            (err: Error, userObj: any) => {
                if(err){
                    callback(err)
                }
                callback(null, userObj)
            });
        }

        findUser((err: Error, result: any) => {
            var myUser = result;
            if (myUser !== null){
                var userToLog = new User(myUser.email, myUser.password);
                const token = jwt.sign({ user: userToLog }, 'eceprojectkey');
                callback(null, {userToLog, token})
            } else {
                console.log("Wrong email or password")
                callback(null, null)
            }
        })
    }
}

