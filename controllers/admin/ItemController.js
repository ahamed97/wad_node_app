const Item = require('../../models/Item');

module.exports.getAll = (req,res) => {
    Item.find({})
    .then(item => {
        if(!item) return res.status(400).json({message: 'No Records Found'});

        return res.status(200).json(item);
    })
}

module.exports.getById =  (req,res) => {
    Item.find({_id:req.params.id})
    .then(item => {
        console.log(item.length);
        if(item.length<1) 
        {
            return res.status(400).json({message: 'No Records Found'})
        }else{
            return res.status(200).json(item);
        }

    })
}

module.exports.post =  (req,res) => {
    try{
        const { name, desc, image , price} = req.body;

        const newItem = new Item({ name, desc, image , price})
        newItem.save()
        return  res.status(200).json(newItem);
    }catch(e){
        return res
        .status(500)
        .json("An Error occured !");
    }
   
}


module.exports.put = async  (req,res) => {
    
    let requestedID = req.params.id;
    try{
        let result = await Item.findById(requestedID);
        if (!result) {
            return res
              .status(404)
              .json("Items you are looking to update does not exist on the DB");
          }
        
        result.set({name:req.body.name,desc:req.body.desc,image:req.body.image,price:req.body.price });
        result = await result.save();
        return  res.status(200).json(result);
    }catch(e){
        return res
        .status(500)
        .json("Internal Server Error"+e);
    }
    
}


module.exports.delete = async  (req,res) => {

    try{
        let result = await Item.findOneAndDelete({_id: req.params.id});
        if (!result) {
            return res
              .status(404)
              .json("Items you are looking to update does not exist on the DB");
          }
        return  res.status(200).json(result);
    }catch(e){
        return res
        .status(500)
        .json("Internal Server Error"+e);
    }

}