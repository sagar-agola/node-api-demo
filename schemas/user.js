const mongoose = require('mongoose');
const validators = require('../validators/validators');

const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            maxlength: [50, 'FirstName can be amost 50 chanracters long.'],
            required: [true, 'Name is required field with FirstnName as child.'],
            trim: true
        },
        lastname: {
            type: String,
            maxlength: [50, 'LastName can be amost 50 chanracters long if specified.'],
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required field.'],
        maxlength: [256, 'Email must be atmost 256 characters long.']
    },
    password: {
        type: String,
        required: [true, 'Password is required field.'],
        minlength: [3, 'Password must be atleast 3 character long.'],
        maxlength: [28, 'Password must be atmost 28 chanracters long.']
    },
    roles: {
        type: [String],
        validate: [validators.NonEmptyArrayValidator, 'Atleast one role is required.']
    }
});


module.exports = mongoose.model('user', userSchema);