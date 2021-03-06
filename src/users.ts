import {UserMongo} from '../mongoose/user';
import {Metric} from '../src/metrics'
import jwt = require('jsonwebtoken');


export class User {

    public email: string;
    public password: string;
    public metrics: Metric[];
  
    constructor(email: string, password: string, metrics: Metric[]) {
      this.email = email;
      this.password = password;
      this.metrics = metrics;
    }
}

export class UsersHandler{

    public userMongo = new UserMongo();
    public userModel = this.userMongo.userModel;

    // Sign up and save
    public signup = async (userToSave: User, callback: any) => {
        
        var toSave = true;
        var errorTest: number = 0; // error vaut 1 si tout user deja existant, vaut 2 si pas de password or email set

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
               return console.log(err);
            users.forEach( (user: any) => {
               if(userToSave.email === user.email){
                    console.log('User already exists');
                    toSave = false;
                    errorTest = -1;
               }
               if(userToSave.email === '' || userToSave.password === ''){
                    console.log('User have no password or email set');
                    toSave = false;
                    errorTest = -2;
               }
            });

            if(toSave === true){
                var doc = new this.userMongo.userModel();
                doc.email = userToSave.email
                doc.password = userToSave.password
                doc.metrics = userToSave.metrics
                doc.save( (err: Error, user: any) => {
                    if (err) { throw err; }

                    const token = jwt.sign({ userID: user.id }, 'eceprojectkey');
                    callback(null, token)
                });
            } else {
                callback(null, errorTest)
            }
         });
         
    }

    // Finding the user for logging in
    public login = async (userToLog: User, callback: any) => {

        var isFound = false
        var userID = -1 // by default, incorrect ID is -1

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
                return console.log(err);

            users.forEach( (user: any) => {
                if(userToLog.email === user.email && userToLog.password === user.password){
                    isFound = true
                    userID = user.id
                }
            })
            
            if(isFound === true && userID !== -1){
                const token = jwt.sign({ userID: userID }, 'eceprojectkey');
                callback(null, token)

            } else {
                callback(null, userID)
            }
        });
    }

    // Find a user in db and retrieve it
    public find = async (userID: any, callback: any) => {
        var isFound = false
        var myUser = {}

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
                return console.log(err);

            users.forEach( (user: any) => {
                if(userID === user.id){
                    isFound = true
                    myUser = new User(user.email, user.password, user.metrics)
                }
            })
            
            if(isFound === true && myUser !== {}){
                callback(null, myUser)

            } else {
                callback(null, null)
            }
        });
    }

    // Delete an user in db
    public delete = async (userToDelete: User, callback: any) => {

        await this.userModel.deleteOne( {email: userToDelete.email}, (err: Error, user: any) => {
            if (err) { throw err; }

            callback(null, userToDelete)
        });
    }

    // Update an user email/password in db
    public update = async (userToUpdate: User, userUpdated: User, callback: any) => {

        var toUpdate = true
        var errorTest;

        var newEmail = ""
        var newPassword = ""
        userUpdated.email === "" ? newEmail = userToUpdate.email : newEmail = userUpdated.email
        userUpdated.password === "" ? newPassword = userToUpdate.password : newPassword = userUpdated.password

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
                return console.log(err);

            users.forEach( (user: any) => {
                if(newEmail === user.email && newEmail !== userToUpdate.email){
                    toUpdate = false
                    errorTest = -1;
                }
            })

            if(toUpdate === true){
                this.userModel.updateOne( {email: userToUpdate.email}, {email: newEmail, password: newPassword}, (err: Error, user: any) => {
                    if (err) { throw err; }
                    var newUser = new User(newEmail, newPassword, userToUpdate.metrics)
                    callback(null, newUser)
                })
            } else {
                callback(null, errorTest)
            }
        })
    }

    // drop the database of users
    public drop = async (callback: any) => { 
        
        var toDrop = true;

        if(toDrop === true){
            await this.userModel.deleteMany({}, (err: Error, result: any) => {
                if (err) { throw err; }
                callback(null, result)
            })
        } else {
            callback(null, null)
        }
        
    }

}

