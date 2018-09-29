var mongoose = require('mongoose');
// const URI = 'mongodb://localhost/bloothers';
const URI = process.env.DATABASE_URI;

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;