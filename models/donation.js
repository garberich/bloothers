var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var donationSchema = new Schema({
    id_user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    id_eployee: { type: mongoose.SchemaTypes.ObjectId, ref: 'Employee', required: true },
    quantity: { type: Number, required: true },
    id_donation_type: { type: mongoose.SchemaTypes.ObjectId, ref: 'DonationType', required: true },
    created_date: { type: Date, default: Date.now },
    product: { type: Product, required: true }
});

module.exports = mongoose.model('Donation', donationSchema);