let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

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

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // server err?
            if (err) {
                return res.status(500).json({ error: true, msg: 'Server encountered Error!' });
            }
            // is there a user login error?
            if (!user) {
                return res.status(500).json({ error: true, msg: 'User failed Logged in!' });
            }
            res.json({
                success: true,
                msg: 'User Logged in Successfully!',
                user: user,
                token: getJWTToken(user.email, user.password)
            });
        }
    )(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.json({
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
                    authToken: getJWTToken(newUser.email, newUser.password)
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

function getJWTToken(email, password) {
    const payload = {
        email: email,
        password: password,
    }
    const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800 // 1 week
    });
    return authToken;
}