var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect("mongodb://localhost:27017/nodeProject", options);
mongoose.connection
    .once('open', () => {
        done();
    })
    .on('error', (error) => {
        console.warn('Error', error);
    })
