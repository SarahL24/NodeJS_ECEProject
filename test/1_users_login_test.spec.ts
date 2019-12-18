import { expect } from 'chai';
import db from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';


var dbUsr: UsersHandler;

describe("Users test 2", function () {
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        done();
    });

    it("login a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        var userToLog = new User('sarah92@hotmail.fr', 'sarah', [])
        dbUsr.login(userToLog, (err: Error, result: any) => {
            //console.log("test 4 login OK:", result);
            //console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');

        }).then(() => {
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });
    });

    it("try to login a User who not exist to the DB, err should be null, result should be equal to -1", function (done) {
        var userToLog = new User('notexist@ece.fr', 'sarah', [])
        dbUsr.login(userToLog, (err: Error, result: any) => {
            //console.log("test 4 login fail:", result);
            //console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.equal(-1);

        }).then(() => {
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });
    });

});