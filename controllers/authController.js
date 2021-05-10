const User = require('../models/User');

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
module.exports.register = (req,res) => {
    const { name, email, password , address , phone} = req.body;

    if(!name || !email || !password || !address || !phone){
        res.status(400).json({message: 'All fields required'})
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({message: 'User already exists'});
    });
        const newUser = new User({ name, email, password , address , phone})
        newItem.save()
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        res.json({
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                address: user.address,
                                phone: user.phone
                            }
                        })
                    })
            })
        })
}

module.exports.login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({message: 'All fields required'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({message: 'User does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

                            res.json({
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    address: user.address,
                                    phone: user.phone
                                }
                            });
                        }
                    )
                })
}