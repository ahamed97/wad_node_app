const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
    token: {
        type: String
    }
})

module.exports = Social = mongoose.model('social', SocialSchema);
