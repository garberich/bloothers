var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var campaignSchema = new Schema({
    id_health_center: { type: mongoose.Schema.Types.ObjectId, ref: 'Health_Center', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: false }, // images.push("imagen1");
    created_date: { type: Date, default: Date.now },
    finish_date: { type: Date, required: false },
    points: { type: Number, required: false },
    quantity_target: { type: Number, required: false },
    adress: { type: String, required: false },
    lng: { type: Number, required: false },
    ltd: { type: Number, required: false },
    status: { type: Boolean, required: true }
});

module.exports = mongoose.model('Campaign', campaignSchema);