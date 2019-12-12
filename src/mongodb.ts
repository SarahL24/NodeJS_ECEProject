import mongoose = require('mongoose');

//======================= Mongo Config ====================//
export class MongoDB{

    private options = {
        autoIndex: false, // Don't build indexes
        //reconnectTries: 3, // Retry up to 3 times
        //reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    public connect = () => {
        console.log('Connection to MongoDB...')
        mongoose.connect("mongodb://localhost:27017/nodeProject", this.options).then(()=>{
            console.log('MongoDB is connected to localhost')
        }).catch(err => {
            console.log('Unable to connect to local MongoDB, trying to reach mongo container')
            //setTimeout(connectWithRetry, 5000)
    }) ||
        mongoose.connect("mongodb://mongo:27017/nodeProject", this.options).then(()=>{
        console.log('MongoDB is connected to mongo container')
    }).catch(err => {
        console.log('Unable to connect to the container MongoDB, trying to reach local mongo')
        //setTimeout(connectWithRetryContainer, 5000)
    })
    }

}

//======================= End of Mongo Config ====================//