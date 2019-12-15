import {UserMongo} from '../mongoose/user';
import jwt = require('jsonwebtoken');
import {User} from './users'

export class Metric {

  public value: number;
  public date: Date;

  constructor(value: number, date: Date) {
    this.value = value;
    this.date = date;
  }
}

export class MetricsHandler {
  public userMongo = new UserMongo();
  public userModel = this.userMongo.userModel;

  // Add a metric of user in db
  public add = async (userToUpdate: User, metric: Metric, callback: any) => {

    var toUpdate = true

    await this.userModel.find().exec( (err: Error, users: any) => {
        if(err)
          return console.log(err);

        if(toUpdate === true){
            this.userModel.updateOne( {email: userToUpdate.email}, {$push: {metrics: metric}}, (err: Error, user: any) => {
              if (err) { throw err; }
              callback(null, metric)
            })
        } else {
            callback(null, null)
        }
    })
  }

  // Delete a metric in db
  public delete = async (user: User, metricID: string, callback: any) => {

    var toDelete = true

    await this.userModel.find().exec( (err: Error, users: any) => {
      
        if(err)
          return console.log(err);

        if(toDelete === true){
            this.userModel.updateOne( {email: user.email}, {$pull: {metrics: {_id: metricID}}}, (err: Error, user: any) => {
              if (err) { throw err; }
              callback(null, metricID)
            })
        } else {
            callback(null, null)
        }
    })
  }

    // Update a metric in db
    public update = async (user: User, metricID: string, newValue: number, callback: any) => {

      var toUpdate = true
  
      await this.userModel.find().exec( (err: Error, users: any) => {
        
          if(err)
            return console.log(err);
  
          if(toUpdate === true){
              this.userModel.updateOne( 
                {email: user.email, "metrics._id": metricID}, 
                {$set: {"metrics.$.value": newValue}},
                (err: Error, result: any) => {
                  if (err) { throw err; }
                  callback(null, metricID)
              })
          } else {
              callback(null, null)
          }
      })
    }

}