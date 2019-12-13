import mongoose = require('mongoose');

//======================= Mongo Config ====================//
export class MongoDB{

    private options = {
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    public connect = () => {
        console.log('Connection to MongoDB...')
        mongoose.connect("mongodb://localhost:27017/nodeProject", this.options)
        .then(()=>{
            console.log('MongoDB is connected to localhost')

        }).catch(err => {
            console.log('Unable to connect to local MongoDB, trying to reach mongo container')

            mongoose.connect("mongodb://mongo:27017/nodeProject", this.options)
            .then( ()=>{
                console.log('MongoDB is connected to mongo container')
            })
            .catch(err => {
                console.log('Unable to connect to the container MongoDB.')
            })
        })
    }

}

//======================= End of Mongo Config ====================//