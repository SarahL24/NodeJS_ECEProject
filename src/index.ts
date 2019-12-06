import express = require('express')
import { MetricsHandler } from './metrics'

const app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017', {
  useMongoClient: true
}); // connect to our database

const port: string = process.env.PORT || '8080'

import path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.render('./partials/description.ejs')
})

app.get(
    '/hello/:name', 
    (req : any, res: any) => {
        res.render('hello.ejs', {name: req.params.name})
})

//const dbMet: MetricsHandler = new MetricsHandler()

app.post('/metrics/:id', (req: any, res: any) => {

})

app.get('/metrics/', (req:any, res:any) => {

})

app.get('/metrics/:id', (req:any, res:any) => {

})

app.delete('/metrics/:id', (req:any, res:any) => {

})

app.delete('/metrics/', (req:any, res:any) => {

})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
