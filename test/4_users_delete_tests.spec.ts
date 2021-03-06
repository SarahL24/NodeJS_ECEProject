import { expect } from 'chai';
import db from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';
import mongoose = require('mongoose');


var dbUsr: UsersHandler;
var userMongo: UserMongo;


describe("Users test 3 Delete", function () {

    this.timeout(150000);
    before(function (done) {
        dbUsr = new UsersHandler();
        
        this.enableTimeouts(false);

        db.then(() => {
            dbUsr.drop((err: Error, result: any)=>{
                console.log("drop", result);

            }).then(()=>{
                var userToSign = new User('todelete@ece.fr', 'sarah', [])
                dbUsr.signup(userToSign, (err: Error, result: any) => {})
                .then(()=>{done()});
            });

        });

        
    
    });

    
    it("delete a user, err should be null, result should not be undefined and equal to a user", function (done) {
        var userToDelete = new User('todelete@ece.fr', 'sarah', [])
        dbUsr.delete(userToDelete, (err: Error, result: any) => {
            console.log("test 5 delete:", result);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('Object');
        }).then(() => {
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });

    });

    after(function (done){
        mongoose.disconnect().then(()=>{
            console.log("disconnected")
            done()
        })
        .catch(err => {
            console.log(err);
            done(err);
        });
        
    })
    

});
