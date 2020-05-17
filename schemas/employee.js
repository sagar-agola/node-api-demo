const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        trim: true
    },
    salary: {
        type: Number,
        min: [0, 'Salary must be positive number'],
        required: [true, 'Salary is required field']
    }
});

module.exports = mongoose.model('employee', employeeSchema);