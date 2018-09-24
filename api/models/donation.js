var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var User = require('./user');
var Employee = require('./employee');
var DonationType = require('./donation_type');

var donationSchema = new Schema({
    id_user: { type: User, required: true },
    id_eployee: { type: Employee, required: true },
    quantity: { type: Number, required: true },
    id_donation_type: { type: DonationType, required: true },
    created_date: { type: Date, default: Date.now },
    product: { type: Product, required: true }
});

module.exports = mongoose.model('Donation', donationSchema);