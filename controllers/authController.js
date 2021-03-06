let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let bcrypt = require('bcrypt');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.json({
        title: 'Home',
        msg: 'You are in Homepage',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.json(
            {
                title: "Login",
                messages: "You are in login page",
                displayName: req.user ? req.user.displayName : ''
            })
    }
}

module.exports.processLoginPage = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send('Email does not exists.')
    };

    const invalidPass = await bcrypt.compare(req.body.password, user.password);

    if (invalidPass) {
        return res.status(400).send('Invalid password.')
    };

    return res.send({
        success: true,
        msg: 'User Logged in Successfully!',
        userInfo: user,
        token: getJWTToken(user.email, user._id)
    });
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.json(
            {
                title: 'Register',
                messages: "You are in register page",
                displayName: req.user ? req.user.displayName : ''
            });
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        username: req.body.username
    });

    User.findOne({ email: newUser.email }).then(existingUser => {
        if (existingUser) {
            return res.status(500).json({ error: true, msg: 'This email is already registered with us.' });
        } else {
            const user = new User(newUser);

            user.save().then(userNew => {
                res.json({
                    success: true,
                    msg: 'You are Registered Successfully!',
                    userInfo: userNew,
                    authToken: getJWTToken(newUser.email, newUser.id)
                });
            }).catch(error => {
                return res.status(500).json({ error: true, msg: error.message });
            })
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
    req.json({
        msg: 'You are log out successfully!'
    });
}

function getJWTToken(email, id) {
    const payload = {
        email: email,
        id: id,
    }
    const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800 // 1 week
    });
    return authToken;
}
