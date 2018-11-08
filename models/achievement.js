var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var AchievementSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    medal: { type: String, required: true }, // Debe almacenar la URL donde se encuentran las imagenes
    points: { type: Number, required: false },
    created_date: { type: Date, default: Date.now },
    finish_date: { type: Date, required: false },
    status: { type: Boolean, required: true }
});

module.exports = mongoose.model('Achievement', AchievementSchema);