const Item = require('../../models/Item');

module.exports.getAll = (req,res) => {
    Item.find({})
    .then(items => {
        if(!items) return res.status(400).json({message: 'No items found'});

        return res.status(200).json(items);
    })
}

module.exports.get =  (req,res) => {

    console.log(req);
    try{
    if(!req.params.id){
        return res.status(500).json({message: "id Required"});
    }
    Item.find({_id:req.params.id})
    .then(item => {
        console.log(item.length);
        if(item.length<1) 
        {
            return res.status(400).json({message: 'Items not found'})
        }else{
            return res.status(200).json(item);
        }

    })
    }catch(e){
        return res
        .status(500)
        .json("An Error occured " + e);
    }
};