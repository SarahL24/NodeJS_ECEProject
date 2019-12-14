import {expect, assert} from 'chai';
import {MongoDB} from '../mongoose/mongodb';
import {User, UsersHandler} from '../src/users';
import {UserMongo} from '../mongoose/user';


var dbUsr: UsersHandler;
var userMongo: UserMongo;
var mongodb: MongoDB;
var userToSave: User;
var userToSave2: User;




describe("Saving user test", function(){
    before(async function () {
        mongodb = new MongoDB();
        mongodb.connect();
        dbUsr = new UsersHandler();
      });
      
      it("saves a User to the DB, err should be null, result should not be undefined and be a token", async function(){
        userToSave = new User('bla2@ece.fr', 'Bla', []);
       return  dbUsr.signup(userToSave, (err:Error, result:any)=>{
            console.log("test1:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');
            
        }).catch(err => {
            console.log(err); 
          });
    });

    it("saves a User whith no password in the DB , err should be null, result should not be undefined and equal to 2", async function(){
        userToSave2 = new User('bla3@ece.fr', '', []);
        return  dbUsr.signup(userToSave2, (err:Error, result:any)=>{
            console.log("test3:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.equal(2);
        })
        .catch(err => {
            console.log(err);
          });
        
    });
      
});

