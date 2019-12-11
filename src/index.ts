import express = require('express');
import url = require('url');
import { MetricsHandler } from './metrics';
import {MongoDB} from './mongodb';
import {User, UsersHandler} from './users';
import jwt = require('jsonwebtoken');


const mongoDB = new MongoDB();

mongoDB.connectWithRetry();

const app = express()
const port: string = process.env.PORT || '8080'

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
  //console.log('My super token !', token)
  //if no token found, return response
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, 'eceprojectkey');
    var myUser = decoded.user;
    //console.log('myUser :', myUser);
    res.render('home.ejs', {email: myUser.email, password: myUser.password})
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
})

/*
app.get(
    '/hello/:name', 
    (req : any, res: any) => {
        res.render('hello.ejs', {name: req.params.name})
})
*/

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
const dbUsr: UsersHandler = new UsersHandler()

app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send('ok')
  })
})


app.post('/user/signup', (req: any, res: any) => {
  const userToSave = new User(req.body.email, req.body.password);
  dbUsr.save(userToSave, (err:Error, result:any) => {
    if(err) {
      console.log(err)
    }
    if(result === null){
      console.log("Unable to save user");
      res.redirect('/');
    } 
    else {
      var myUser = new User(result.userToSave.email, result.userToSave.password);
      console.log(myUser, "as been saved");

      const token = result.token;
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
      var myUser = new User(result.userToLog.email, result.userToLog.password);
      console.log(myUser, 'as been logged in');

      const token = result.token;
      res.redirect(`/home/${token}`)
    }
  });
})


app.get('/metrics/', (req:any, res:any) => {
  dbMet.getAll( (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.get('/testUser/', (req:any, res:any) => {
  dbMet.getAll( (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.get('/metrics/:id', (req:any, res:any) => {
  dbMet.getOne(req.params.id, (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.delete('/metrics/:id', (req:any, res:any) => {
  dbMet.deleteOne(req.params.id, (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.delete('/metrics/', (req:any, res:any) => {
  dbMet.deleteAll( (err: Error | null, result:any) => {
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
