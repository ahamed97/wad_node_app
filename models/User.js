const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    is_admin: {
        type: Boolean
    }
})

module.exports = User = mongoose.model('user', UserSchema);
