const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    orders: [{item_id:String}],
    total:{
        type:Number,
        required: true
    }
    
})

module.exports = Order = mongoose.model('order', OrderSchema);