import { expect } from 'chai';
import { MongoDB } from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';


var dbUsr: UsersHandler;
var userMongo: UserMongo;
var mongodb: MongoDB;

describe("Users test 3 Delete", function () {

    this.timeout(150000);
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        mongodb = new MongoDB();
        var connection = mongodb.connect.then((value) => {
            console.log(value);
            done();
        });
    });

    it("delete a user, err should be null, result should not be undefined and equal to a user", function (done) {
        var userToDelete = new User('todelete@ece.fr', 'sarah', [])
        dbUsr.delete(userToDelete, (err: Error, result: any) => {
            console.log("test 5 delete:", result);
            console.log(err);
            expect(err).to.be.null;
        }).then(() => {
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });

    });

});