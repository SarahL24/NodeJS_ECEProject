const mocha = require('mocha');
const assert = require('assert');
const UserMongo = require('../dist/mongoose/user.js');
const User = require('../dist/src/users.js')

/*describe("Saving user test", function(){

    it("saves a User to the DB", function(){
        //const userMongo = new UserMongo;
        var userTpm = new User({
            email: 'bla@ece.fr',
            password: 'Bla',
            metrics: []
        });
        const userModel = this.userMongo.userModel;
        var doc = new this.userMongo.userModel();
        doc.email = 'bla@ece.fr';
        doc.password = 'Bla';
        doc.metrics = [];
        
        doc.save().then(()=>{
            assert(doc.isNew === false);
            done();
        })

        

    });

    
})*/


describe("premier test", function(){
    it("test add two number", function(){
        assert(2+3 === 5);
    })
})