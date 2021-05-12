const User = require('../models/User');
const { Validator } = require('node-input-validator');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();
module.exports.register = (req, res) => {
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
        res.status(400).json({ message: 'All fields required' })
    }

    const v = new Validator(req.body, {
        email: 'required|email',
    });

    v.check().then((matched) => {
        if (!matched) {
            res.status(400).json({ message: v.errors.email.message });
        }
    });

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'User already exists' });
        });
    const newUser = new User({ name, email, password, address, phone })
    if (!req.body.is_admin) {
        newUser['is_admin'] = false
    }
    else {
        newUser['is_admin'] = true
    }
    //hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign({ user }, process.env.SECRET, (err, token) => {
                        res.status(200).json({
                            token: token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                address: user.address,
                                phone: user.phone,
                                is_admin: user.is_admin
                            }
                        })
                    })
                })
        })
    })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'All fields required' });
    }

    const v = new Validator(req.body, {
        email: 'required|email',
    });

    v.check().then((matched) => {
        if (!matched) {
            res.status(400).json({ message: v.errors.email.message });
        }
    });

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

                    jwt.sign({ user }, process.env.SECRET, (err, token) => {
                        res.status(200).json({
                            token: token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                address: user.address,
                                phone: user.phone,
                                is_admin: user.is_admin
                            }
                        })
                    })
                }
                )
        })
}