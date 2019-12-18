import { expect, assert } from 'chai';
import db from '../mongoose/mongodb';
import { User, UsersHandler } from '../src/users';
import { UserMongo } from '../mongoose/user';
import { Metric, MetricsHandler } from '../src/metrics';


var dbUsr: UsersHandler;
var dbMet: MetricsHandler;
var userMongo: UserMongo;
var MetricID: string;

describe("Metrics test 1 Add", function () {
    before(function (done) {
        this.enableTimeouts(false);
        dbUsr = new UsersHandler();
        dbMet = new MetricsHandler();
    
        var userToSign = new User('maxime@hotmail.fr', 'max', [])
        dbUsr.signup(userToSign, (err: Error, result: any) => {      
        }).then(()=>{done();})
    });

    it("add a metric to a User, err should be null, result should not be undefined and be an Object", function (done) {
        var userToAdd = new User('maxime@hotmail.fr', 'max', [])
        var now = new Date()
        var metric = new Metric(25, now)
        dbMet.add(userToAdd, metric, (err: Error, result: any) => {
            //console.log("test 6 add metric OK:", result);
            //console.log(err);
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.a('Object');


        })
        .then(() => {
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        });
    });

});
