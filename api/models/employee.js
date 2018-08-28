var mongoose = require('mongoose');
var { Schema } = require('mongoose');

var EmployeeSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    id_health_center: { type: String, required: true },
    city: { type: String, required: true },
    birthday: { type: Date, required: true },
    sex: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    cell_phone: { type: Number, required: false },
    avatar: { type: String, required: false },
    document_number: { type: Number, required: true },
    created_date: { type: Date, required: true },
    status: { type: Boolean, required: true },
    rol: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);