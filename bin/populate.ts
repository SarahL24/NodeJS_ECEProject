import db from '../mongoose/mongodb';
import {User, UsersHandler} from '../src/users';
import {Metric} from '../src/metrics';
import mongoose = require('mongoose');

        
//console.log(value)
const dbUsr: UsersHandler = new UsersHandler();

var populate = ( () => {

    // Drop database
    dbUsr.drop((err:Error, result:any) => {
        if(err) {
            console.log(err)
        }
        if(result === null){
            console.log("Unable to drop database");
        } else {
            console.log("Database successfully dropped")
        }
    });

    const metrics: Metric[] = [
        new Metric(14, new Date('December 17, 1995 03:24:00')),
        new Metric(5, new Date('October 9, 2002 04:21:00')),
        new Metric(18, new Date('October 19, 2012 08:16:00')),
        new Metric(30, new Date('November 7, 2019 05:21:00')),
        new Metric(5, new Date('January 22, 2018 07:39:00')),
    ]

    const users: User[] = [
        new User("maxime.billette@gmail.com", "maxou", [
            metrics[0],
            metrics[3]
        ]),

        new User("sarah.lehuby@gmail.com", "latiteSassa", [

        ]),

        new User("amir.missidi@yahoo.fr", "Spartamir75", [
            metrics[2]
        ]),

        new User("sergei.kudinov@adaltas.com", "SergeiTheBest", [
            metrics[1],
            metrics[2],
            metrics[4]
        ]),

        new User("gregor.jouet@adaltas.com", "DevOpsForTheWin", [
            metrics[1],
            metrics[3],
            metrics[0]
        ])
    ]

    var count = 0;

    users.forEach( (user) =>{
        dbUsr.signup(user, (err:Error, result:any) => {
            if(err) {
                console.log(err)
            }
            if(result === null){
                console.log("Unable to save user");
            } else {
                console.log(user, "has been added")
            }
            count++

            if(count === users.length){
                mongoose.disconnect().then(() => {
                    console.log("Disconnected from MongoDB")
                })
            }
        })   
    })


})        

db.then( ()=>{
    populate()
})


