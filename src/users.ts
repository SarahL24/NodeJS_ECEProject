import {UserMongo} from '../mongoose/user';
import jwt = require('jsonwebtoken');


export class User {

    public email: string;
    public password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
}

export class UsersHandler{

    public userMongo = new UserMongo();
    public userModel = this.userMongo.userModel;

    // Sign up and save
    public signup = async (userToSave: User, callback: any) => {
        
        var toSave = true;

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
               return console.log(err);
            users.forEach( (user: any) => {
               if(userToSave.email === user.email){
                    console.log('User already exists');
                    toSave = false;
               }
               if(userToSave.email === '' || userToSave.password === ''){
                    console.log('User have no password or email set');
                    toSave = false;
               }
            });

            if(toSave === true){
                var doc = new this.userMongo.userModel();
                doc.email = userToSave.email
                doc.password = userToSave.password
                doc.save( (err: Error, user: any) => {
                    if (err) { throw err; }

                    const token = jwt.sign({ userID: user.id }, 'eceprojectkey');
                    callback(null, token)
                });
            } else {
                callback(null, null)
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
                callback(null, null)
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
                    myUser = new User(user.email, user.password)
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

    // Update an user in db
    public update = async (userToUpdate: User, userUpdated: User, callback: any) => {

        var toUpdate = true

        var newEmail = ""
        var newPassword = ""
        userUpdated.email === "" ? newEmail = userToUpdate.email : newEmail = userUpdated.email
        userUpdated.password === "" ? newPassword = userToUpdate.password : newPassword = userUpdated.password

        await this.userModel.find().exec( (err: Error, users: any) => {
            if(err)
                return console.log(err);

            users.forEach( (user: any) => {
                if(newEmail === user.email){
                    toUpdate = false
                }
            })

            if(toUpdate === true){
                this.userModel.updateOne( {email: userToUpdate.email}, {email: newEmail, password: newPassword}, (err: Error, user: any) => {
                    if (err) { throw err; }
                    var newUser = new User(newEmail, newPassword)
                    callback(null, newUser)
                })
            } else {
                callback(null, null)
            }
        })
    }

}

