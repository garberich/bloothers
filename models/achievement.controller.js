var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var AchievementSchema = new Schema({
    // name
    // description
    // medal // Debe almacenar la URL donde se encuentran las imagenes
    // points
    // created_date
    // finish_date
    // status
});

module.exports = mongoose.model('Achievement', AchievementSchema);