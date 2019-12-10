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

    public connectWithRetry = () => {
        console.log('MongoDB connection to localhost...')
        mongoose.connect("mongodb://localhost:27017/nodeProject", this.options).then(()=>{
            console.log('MongoDB is connected to localhost')
        }).catch(err => {
            console.log('Unable to connect to localhost, trying to connect to mongo container')
            this.connectWithRetryContainer
            //console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
            //setTimeout(connectWithRetry, 5000)
    })
    }

    public connectWithRetryContainer = () => {
        console.log('MongoDB connection to mongo container...')
        mongoose.connect("mongodb://mongo:27017/nodeProject", this.options).then(()=>{
            console.log('MongoDB is connected to mongo container')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful')
            //setTimeout(connectWithRetryContainer, 5000)
        })
    }

}

//======================= End of Mongo Config ====================//