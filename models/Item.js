const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const  ItemSchema = new Schema({
    
    name: {
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    }

})

module.exports = Item = mongoose.model('item',ItemSchema);