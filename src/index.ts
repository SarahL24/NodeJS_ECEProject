import express = require('express');
import mongoose = require('mongoose');

import { MetricsHandler } from './metrics'

var Schema = mongoose.Schema;

const app = express();

//======================= Mongo Config ====================//

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 3, // Retry up to 3 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

const connectWithRetry = () => {
console.log('MongoDB connection to localhost...')
mongoose.connect("mongodb://localhost:27017/company", options).then(()=>{
  console.log('MongoDB is connected to localhost')
}).catch(err => {
  console.log('Unable to connect to localhost, trying to connect to mongo container')
  connectWithRetryContainer
  //console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
  //setTimeout(connectWithRetry, 5000)
})
}

const connectWithRetryContainer = () => {
  console.log('MongoDB connection to mongo container...')
  mongoose.connect("mongodb://mongo:27017/company", options).then(()=>{
    console.log('MongoDB is connected to mongo container')
  }).catch(err => {
    console.log('MongoDB connection unsuccessful')
    //setTimeout(connectWithRetryContainer, 5000)
  })
  }

connectWithRetry()
connectWithRetryContainer()

var connection = mongoose.connection;

//======================= End of Mongo Config ====================//

//======================= Mongo Tests ============================//
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("employees", function(err: Error, collection: any){
        collection.find({}).toArray(function(err: Error, data: any){
            console.log("here is the data : ");
            console.log(data); // it will print your collection data
        })
    });
});

//======================= End of Mongo Tests =======================//


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
