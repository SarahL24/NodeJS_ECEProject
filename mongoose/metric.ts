var mongoose = require('mongoose');

export class MetricMongo{
    // Schema for metric
    public metricSchema = new mongoose.Schema({
        userID :  Number,
        label : String,
        value : Number,
    });
    
    // Model for metric
    public metricModel = mongoose.model('metric', this.metricSchema);
}