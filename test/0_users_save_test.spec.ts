import { expect, assert } from 'chai';
import { MongoDB } from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';
import { Metric, MetricsHandler } from '../src/metrics';


var dbUsr: UsersHandler;
var dbMet: MetricsHandler;
var userMongo: UserMongo;
var mongodb: MongoDB;
var userToSave: User;
var userToSaveWrong: User;
var userUpdate: User;
var a = 0;
var MetricID: string;

describe("Users test 1 Saving", function () {
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        mongodb = new MongoDB();
        dbMet = new MetricsHandler()
        a = 1;
        var connection = mongodb.connect.then((value) => {
            console.log(value);
            dbUsr.drop((err: Error, result: any)=>{
                console.log("drop", result);

            }).then(()=>{done();});

        });
    });

    it("saves a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        userToSave = new User('bla2@ece.fr', 'Bla', []);
        dbUsr.signup(userToSave, (err: Error, result: any) => {
            //console.log("test 1 signup OK:", result);
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

    it("saves a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        var userToSave2 = new User('sarah92@hotmail.fr', 'sarah', []);
        dbUsr.signup(userToSave2, (err: Error, result: any) => {
            //console.log("test 1:", result);
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

    it("saves a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        var userToSave2 = new User('todelete@ece.fr', 'sarah', []);
        dbUsr.signup(userToSave2, (err: Error, result: any) => {
            //console.log("test 1:", result);
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

    it("saves a User whith no password in the DB , err should be null, result should not be undefined and equal to 2", function (done) {
        userToSaveWrong = new User('bla3@ece.fr', '', []);
        dbUsr.signup(userToSaveWrong, (err: Error, result: any) => {
            //console.log("test 2 signup fail:", result);
            //console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.equal(2);
        })
            .then(() => {
                done();
            }).catch(err => {
                console.log(err);
                done(err);
            });
    });

});


/*describe("USERS test", function () {
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        mongodb = new MongoDB();
        dbMet = new MetricsHandler()
        a = 1;
        var connection = mongodb.connect.then((value) => {
            console.log(value);
            done();

        });
    });
    it("test", function () {
        assert(a === 1);
    });*/

    /*it("saves a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        userToSave = new User('bla2@ece.fr', 'Bla', []);
        dbUsr.signup(userToSave, (err: Error, result: any) => {
            console.log("test 1 signup OK:", result);
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
    });*/

    /*it("saves a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        var userToSave2 = new User('sarah92@hotmail.fr', 'sarah', []);
        dbUsr.signup(userToSave2, (err: Error, result: any) => {
            console.log("test 1:", result);
            console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('string');

        }).then(() => {
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });
    });*/

    /*it("saves a User whith no password in the DB , err should be null, result should not be undefined and equal to 2", function (done) {
        userToSaveWrong = new User('bla3@ece.fr', '', []);
        dbUsr.signup(userToSaveWrong, (err: Error, result: any) => {
            console.log("test 2 signup fail:", result);
            //console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.equal(2);
        })
            .then(() => {
                done();
            }).catch(err => {
                console.log(err);
                done(err);
            });
    });*/


    /* it("update a user, err should be null, result should not be undefined and equal to a user", function (done) {
         //console.log(userToSave);
         var userToUpdate = new User('bla2@ece.fr', 'Bla', []);
         userUpdate = new User('test@ece.fr', 'test', []);
         dbUsr.update(userToUpdate, userUpdate, (err: Error, result: any) => {
             console.log("test 3 update OK:", result);
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
 
     });*/

    /*it("login a User to the DB, err should be null, result should not be undefined and be a token", function (done) {
        var userToLog = new User('sarah92@hotmail.fr', 'sarah', [])
        dbUsr.login(userToLog, (err: Error, result: any) => {
            console.log("test 4 login OK:", result);
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
    });*/

    /*it("login a User who not exist to the DB, err should be null, result should be equal to -1", function (done) {
        var userToLog = new User('notexist@ece.fr', 'sarah', [])
        dbUsr.login(userToLog, (err: Error, result: any) => {
            console.log("test 4 login fail:", result);
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
    });*/

    /*it("delete a user, err should be null, result should not be undefined and equal to a user", function(done){
        var userToDelete = new User('sarah92@hotmail.fr','sarah',[])
        dbUsr.delete(userToDelete, (err:Error, result:any)=>{
            console.log("test 5 delete:", result);
            //console.log(err);
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

    /*it("add a metric to a User, err should be null, result should not be undefined and be an Object", function (done) {
        var userToAdd = new User('sarah92@hotmail.fr', 'sarah', [])
        var now = new Date()
        var metric = new Metric('', 25, now)
        dbMet.add(userToAdd, metric, (err: Error, result: any) => {
            console.log("test 6 add metric OK:", result);
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
    });*/



//});
