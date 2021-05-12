const Item = require('../../models/Item');

module.exports.getAll = (req,res) => {
    Item.find({})
    .then(items => {
        if(!items) return res.status(400).json({message: 'No items found'});

        return res.status(200).json(items);
    })
}