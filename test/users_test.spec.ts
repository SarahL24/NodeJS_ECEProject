import {expect, assert} from 'chai';
import {MongoDB} from '../mongoose/mongodb';
import {User, UsersHandler} from '../src/users';
import {UserMongo} from '../mongoose/user';


var dbUsr: UsersHandler;
var userMongo: UserMongo;
var mongodb: MongoDB;
var userToSave: User;
var userToSaveWrong: User;
var userUpdate: User;




describe("Users test", function(){
    before(function (done) {
        mongodb = new MongoDB();
        mongodb.connect();
        dbUsr = new UsersHandler();
        done();

      });
      
      it("saves a User to the DB, err should be null, result should not be undefined and be a token",  function(done){
        userToSave = new User('bla2@ece.fr', 'Bla', []);
         dbUsr.signup(userToSave, (err:Error, result:any)=>{
            console.log("test 1:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');
            
        }).then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          });
    });

    /*it("saves a User to the DB, err should be null, result should not be undefined and be a token",  function(done){
        var userToSave2 = new User('sarah92@hotmail.fr', 'sarah', []);
         dbUsr.signup(userToSave2, (err:Error, result:any)=>{
            console.log("test 1:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');
            
        }).then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          });
    });*/

    it("saves a User whith no password in the DB , err should be null, result should not be undefined and equal to 2", function(done){
        userToSaveWrong = new User('bla3@ece.fr', '', []);
        dbUsr.signup(userToSaveWrong, (err:Error, result:any)=>{
            console.log("test 2:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.equal(2);
        })
        .then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          }); 
    });


    it("update a user, err should be null, result should not be undefined and equal to a user", function(done){
        console.log(userToSave);
        userUpdate = new User ('test@ece.fr','test',[]);
        dbUsr.update(userToSave, userUpdate, (err:Error, result:any)=>{
            console.log("test 3:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('Object');
        }).then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          });
        
    });

    it("login a User to the DB, err should be null, result should not be undefined and be a token", function(done){
        var userToLog = new User('sarah92@hotmail.fr','sarah',[])
        dbUsr.login(userToLog, (err:Error, result:any)=>{
            console.log("test log:",result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');
            
        }).then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          });
    });

    /*it("delete a user, err should be null, result should not be undefined and equal to a user", function(done){
        var userToDelete = new User('sarah92@hotmail.fr','sarah',[])
        dbUsr.delete(userToDelete, (err:Error, result:any)=>{
            console.log("test 4:", result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('Object');
        }).then(()=>{
            done();
        }).catch(err => {
            console.log(err); 
            done(err);
          });
        
    });*/

      
});
