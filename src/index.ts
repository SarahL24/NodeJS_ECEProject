import express = require('express');
import { MetricsHandler } from './metrics';
import {MongoDB} from './mongodb';
import {User} from './users';


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

/*
app.get(
    '/hello/:name', 
    (req : any, res: any) => {
        res.render('hello.ejs', {name: req.params.name})
})
*/

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send('ok')
  })
})

/*
app.post('/user', (req: any, res: any) => {
  const myUser = new User();
  myUser.testSave();
  res.status(200).send('user added');
})
*/

app.post('/user/signup', (req: any, res: any) => {
  const myUser = new User(req.body.email, req.body.password);
  myUser.save();
  res.redirect('/');
})

app.post('/user/login', (req: any, res: any) => {
  
  var userToFind = new User(req.body.email, req.body.password);
  userToFind.find((err: Error, result:any) =>{
    if(err) {
      console.log(err)
    }
    if(result === null){
      console.log("Unable to find user");
    } 
    else {
      var myUser = new User(result.email, result.password);
      console.log(myUser);
    }
  });

  res.redirect('/');
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
