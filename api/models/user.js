var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var Achievement = require('./achievement');
var Donation = require('./donation');

var UserSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    city: { type: String, required: true },
    birthday: { type: Date, required: true },
    sex: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    cell_phone: { type: Number, required: false },
    avatar: { type: String, required: false },
    document_number: { type: Number, required: true },
    blood_type: { type: String, required: true },
    RH: { type: String, required: true },
    Achievement: { type: [Achievement] },
    Donation: { type: [Donation] },
    number_points: { type: Number },
    created_date: { type: Date, default: Date.now },
    status: { type: Boolean, required: true },
    rol: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);