import mongoose = require('mongoose');

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  
  
  console.log('Connection to MongoDB...')
  var db = mongoose.connect("mongodb://localhost:27017/nodeProject", options)
  .then(()=>{
      console.log('MongoDB is connected to localhost')
      //code()
  })
  .catch( (err) => {
      console.log('Unable to connect to local MongoDB, trying to reach mongo container')
  
      db = mongoose.connect("mongodb://mongo:27017/nodeProject", options)
      .then( ()=>{
          console.log('MongoDB is connected to mongo container')
          //code()
      })
      .catch(err => {
          console.log('Unable to connect to the container MongoDB.')
          console.log(err)
      })
  })

export default db;