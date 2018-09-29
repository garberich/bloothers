var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var DonationTypeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    total_points: { type: Number, required: false },
    id_campaign: { type: mongoose.SchemaTypes.ObjectId, ref: 'Campaign', required: false }
});

module.exports = mongoose.model('Donation_Type', DonationTypeSchema);