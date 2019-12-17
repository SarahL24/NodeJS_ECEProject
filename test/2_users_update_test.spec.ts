/*
import { expect } from 'chai';
import db from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';


var dbUsr: UsersHandler;
var userUpdate: User;



describe("Users test 3 Updating", function () {
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        done();
    });

    it("update a user, err should be null, result should not be undefined and equal to a user", function (done) {
        var userToUpdate = new User('bla2@ece.fr', 'Bla', []);
        userUpdate = new User('test@ece.fr', 'test', []);
        dbUsr.update(userToUpdate, userUpdate, (err: Error, result: any) => {
            //console.log("test 3 update OK:", result);
            //console.log(err);
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
});
*/