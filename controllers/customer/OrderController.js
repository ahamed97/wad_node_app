const Order = require('../../models/Order');

module.exports.post =  (req,res) => {
    try{
        const { user_id, orders , total} = req.body;
        if(!user_id || !orders || !total){
            return res.status(500).json("Fields cannot be null");
        }
        const newOrder = new Order({ user_id, orders, total})
        newOrder.save()
        return  res.status(200).json(newOrder);
    }catch(e){
        return res
        .status(500)
        .json("An Error occured !");
    }
   
}
