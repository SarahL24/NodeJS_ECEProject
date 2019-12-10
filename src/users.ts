import {UserMongo} from '../mongoose/user';

var userMongo = new UserMongo();
var userModel = userMongo.userModel;

export class User {

    public email: string;
    public password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
    
    // Saving
    public save = () => {
        var myUser = new userModel({ 
            email : this.email,
            password: this.password,
        })
        myUser.save(function (err: Error) {
            if (err) { throw err; }
            console.log('User', myUser.email,', with password', myUser.password ,'successfully added');
        });
    }

    // Finding the user for logging in
    public find = (callback: any) => {

        var email = this.email
        var password = this.password

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
            var myUserObj = result;
            if (myUserObj !== null){
                var myUser = new User(myUserObj.email, myUserObj.password)
                callback(null, myUser)
            } else {
                callback(null, null)
            }
        })
    }
}

