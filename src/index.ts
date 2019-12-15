import express = require('express');
import {MongoDB} from '../mongoose/mongodb';
import {User, UsersHandler} from './users';
import {Metric, MetricsHandler} from './metrics';
import path = require('path');
const app = express()
const auth = require('./auth');
const port: string = process.env.PORT || '8080'

const dbUsr: UsersHandler = new UsersHandler()
const dbMet: MetricsHandler = new MetricsHandler()

const mongoDB = new MongoDB();


var connection = mongoDB.connect;
    connection.then((value) => {
    app.use(express.static(path.join(__dirname, '../public')))
    app.use(express.urlencoded())
    app.use(express.json())

    app.set('views', __dirname + "/view")
    app.set('view engine', 'ejs');

    app.get('/', (req: any, res: any) => {
      res.render('credentials.ejs')
    })

    app.get('/home', (req: any, res: any) => {
      res.redirect('/')
    })


    app.get('/home/:token', auth, async (req: any, res: any) => {

      const token = req.params.token;
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: User) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var myUser = result
          res.render('home.ejs', {user: myUser, token: req.params.token})
        }
      })
    })

    app.post('/user/signup', (req: any, res: any) => {
      const userToSave = new User(req.body.email, req.body.password, []);
      dbUsr.signup(userToSave, (err:Error, result:any) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to save user");
          res.redirect('/');
        } 
        else {
          const token = result;
          res.redirect(`/home/${token}`)
        }
      });
    })


    app.post('/user/login', (req: any, res: any) => {
      
      var userToLog = new User(req.body.email, req.body.password, []);
      dbUsr.login(userToLog, (err: Error, result:any) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user");
          res.redirect('/');
        } 
        else {
          const token = result;
          res.redirect(`/home/${token}`)
        }
      });
    })

    app.post('/user/delete/:token', auth, (req: any, res: any) => {
      
      const token = req.params.token;  
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: any) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var userToDelete = result
          dbUsr.delete(userToDelete, (err: Error, result:any) => {
            if(err) {
              console.log(err)
            }
            if(result === null){
              console.log("Unable to delete user");
              res.redirect(`/home/${token}`)
            } 
            else {
              console.log("User successfully deleted");
              res.redirect('/')
            }
          });
        }
      })
    })

    app.post('/user/update/:token', auth, (req: any, res: any) => {
      
      const token = req.params.token;
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: User) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var userToUpdate = result
          var userUpdated = new User(req.body.newEmail, req.body.newPassword, [])

          dbUsr.update(userToUpdate, userUpdated, (err: Error, result: User) => {
            if(err) {
              console.log(err)
            }
            if(result === null){
              console.log("Unable to update user");
              res.redirect(`/home/${token}`)
            } 
            else {
              var myUser = result
              console.log("User successfully updated");
              res.redirect(`/home/${token}`)       
            }
          });
        }
      })
    })

    app.post('/metrics/add/:token', auth, (req: any, res: any) => {

      const token = req.params.token;
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: User) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var userToUpdate = result
          var now = new Date()
          var metric = new Metric('', req.body.value, now)

          dbMet.add(userToUpdate, metric, (err: Error, result: Metric) => {
            if(err) {
              console.log(err)
            }
            if(result === null){
              console.log("Unable to add metric to user");
              res.redirect(`/home/${token}`)
            } 
            else {
              var addedMetric = result
              console.log("Metric successfully added");
              res.redirect(`/home/${token}`)       
            }
          });
        }
      })
    })

    app.post('/metrics/delete/:token', auth, (req: any, res: any) => {

      const token = req.params.token;
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: User) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var userToUpdate = result
          var metricID = req.body.metricID

          dbMet.delete(userToUpdate, metricID, (err: Error, result: string) => {
            if(err) {
              console.log(err)
            }
            if(result === null){
              console.log("Unable to delete metric to user");
              res.redirect(`/home/${token}`)
            } 
            else {
              var deletedMetricID = result
              console.log("Metric successfully deleted");
              res.redirect(`/home/${token}`)       
            }
          });
        }
      })
    })

    app.post('/metrics/update/:token', auth, (req: any, res: any) => {

      const token = req.params.token;
      var userID = req.userID;

      dbUsr.find(userID, (err: Error, result: User) => {
        if(err) {
          console.log(err)
        }
        if(result === null){
          console.log("Unable to find user, token may be invalid");
          res.status(400).send("Unable to find user, token may be invalid");
        } 
        else {
          var userToUpdate = result
          var metricID = req.body.metricID
          var newValue = req.body.newValue

          dbMet.update(userToUpdate, metricID, newValue, (err: Error, result: string) => {
            if(err) {
              console.log(err)
            }
            if(result === null){
              console.log("Unable to update metric to user");
              res.redirect(`/home/${token}`)
            } 
            else {
              var deletedMetricID = result
              console.log("Metric successfully updated");
              res.redirect(`/home/${token}`)
            }
          });
        }
      })
    })


    app.listen(port, (err: Error) => {
      if (err) {
        throw err
      }
      console.log(`server is listening on port ${port}`)
    })
  })

  app.post('/metrics/update/:token', auth, (req: any, res: any) => {





