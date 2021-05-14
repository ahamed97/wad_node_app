const Social = require('../models/Social');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {

    if (!req.body.token) {
        res.status(400).json({ message: 'Token required' });
    }
    try {
        var gToken = req.body.token
        Social.findOne({ "token" : gToken })
            .then(social => {
                if (!social) {
                    jwt.sign({ gToken }, process.env.SECRET, (err, token) => {
                        res.status(200).json({
                            token: token
                        })
                    })
                }
            })
            
            const newSocial = new Order({"token" : gToken})
            newSocial.save()
            jwt.sign({ gToken }, process.env.SECRET, (err, token) => {
                res.status(200).json({
                        token: token
                    })
                })
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
}
