const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required field.']
    },
    password: {
        type: String,
        required: [true, 'Password is required field.']
    }
});


module.exports = mongoose.model('login', loginSchema);