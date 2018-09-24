var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var Campaign = require('./campaign');

var DonationTypeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    total_points: { type: Number, required: false },
    id_campaign: { type: Campaign, required: false }
});

module.exports = mongoose.model('DonationType', DonationTypeSchema);