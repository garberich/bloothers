var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var HealthCenterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    city: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: false },
    cell_phone: { type: Number, required: false },
    adress: { type: String, required: true },
    lng: { type: Number },
    ltd: { type: Number },
    avatar: { type: String, required: false },
    status: { type: Boolean, required: true }
});


module.exports = mongoose.model('Health_Center', HealthCenterSchema);