const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: true
    }
})

module.exports = User = mongoose.model('user', UserSchema);
