import express = require('express');
import { MetricsHandler } from './metrics';
import {MongoDB} from './mongodb';
import {User, UsersHandler} from './users';
import jwt = require('jsonwebtoken');


const mongoDB = new MongoDB();

mongoDB.connect();

const app = express()
const port: string = process.env.PORT || '8080'

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
const dbUsr: UsersHandler = new UsersHandler()

import path = require('path')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded())

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.render('credentials.ejs')
})


app.get('/home/:token', (req: any, res: any) => {

  const token = req.params.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, 'eceprojectkey');
    var userID = decoded.userID;

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
        res.render('home.ejs', {email: myUser.email, password: myUser.password, token: token})
      }
    })
  } catch (ex) {
    console.log("Invalid token.");
    res.status(400).send("Invalid token.");
  }
})

app.post('/user/signup', (req: any, res: any) => {
  const userToSave = new User(req.body.email, req.body.password);
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
  
  var userToLog = new User(req.body.email, req.body.password);
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

app.post('/user/delete/:token', (req: any, res: any) => {
  const token = req.params.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, 'eceprojectkey');
    var userID = decoded.userID;

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
            res.redirect('/');
          } 
          else {
            console.log("User successfully deleted");
            res.redirect('/')
          }
        });
      }
    })
  } catch (ex) {
    console.log("Invalid token.");
    res.status(400).send("Invalid token.");
  }
})


app.post('/user/update/:token', (req: any, res: any) => {
  const token = req.params.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, 'eceprojectkey');
    var userID = decoded.userID;

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
        var userUpdated = new User(req.body.newEmail, req.body.newPassword)

        dbUsr.update(userToUpdate, userUpdated, (err: Error, result: User) => {
          if(err) {
            console.log(err)
          }
          if(result === null){
            console.log("Unable to update user");
            res.render('home.ejs', {email: userToUpdate.email, password: userToUpdate.password, token: token})
          } 
          else {
            var myUser = result
            console.log("User successfully updated");
            res.render('home.ejs', {email: myUser.email, password: myUser.password, token: token})
          }
        });
      }
    })
  } catch (ex) {
    console.log("Invalid token.");
    res.status(400).send("Invalid token.");
  }
})


app.get('/metrics/', (req:any, res:any) => {
  dbMet.getAll( (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
