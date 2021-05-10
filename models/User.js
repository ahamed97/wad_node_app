const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
       required: [true,'Please enter an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    }
})

module.exports = User = mongoose.model('user',UserSchema);

