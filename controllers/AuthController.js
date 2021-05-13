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
    try {
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
    } catch ($e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
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
    try {
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
    } catch ($e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
}

module.exports.profileGet = (req, res) => {
    try {
        const bearerToken = req.headers['authorization'];
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        var decoded = jwt.verify(token, process.env.SECRET);
        User.find({ _id: decoded.user._id }, { password: 0 })
            .then(user => {
                if (user.length < 1) {
                    return res.status(400).json({ message: 'No user found' })
                } else {
                    return res.status(200).json(user);
                }

            })
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
}

module.exports.profileUpdate = async (req, res) => {
    try {
        const bearerToken = req.headers['authorization'];
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        var decoded = jwt.verify(token, process.env.SECRET);

        let user = await User.findById(decoded.user._id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "No user found" });
        }

        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.address) {
            user.address = req.body.address
        }
        if (req.body.phone) {
            user.name = req.body.phone
        }

        user.set({ user });
        var result = await user.save();
        return res.status(200).json(result);
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
}

module.exports.passwordUpdate = async (req, res) => {
    try {
        const bearerToken = req.headers['authorization'];
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        var decoded = jwt.verify(token, process.env.SECRET);

        const v = new Validator(req.body, {
            old_password: 'required',
            new_password: 'required',
        });

        v.check().then((matched) => {
            if (!matched) {
                res.status(400).json({ message: "old_password & new_password fields required" });
            }
        });

        let user = User.findById(decoded.user._id);

        if (!user) {
            return res
                .status(404)
                .json({ message: "No user found" });
        }

        bcrypt.compare(req.body.old_password, user.passowrd, function (err, result) {
            //hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                    if (err) throw err;
                    User.findOneAndUpdate({ _id: decoded.user._id }, { $set: { password: hash } }, { upsert: true }, function (err, doc) {
                        if (err) return res.send(500, { error: err });
                        return res.status(200).json({ message: "reset successfully" });
                    });
                })
            })
        });
        res.status(400).json({ message: "old_password is wrong" });
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Internal Server Error" + e });
    }
}