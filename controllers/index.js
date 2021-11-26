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
    if(!req.user)
    {
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
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                return res.status(500).json({ error: true, msg: 'User failed Logged in!' });
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }

                const payload =
                {
                    email: user.email,
                    password: user.password,
                }

                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true, msg: 'User Logged in Successfully!',
                    user: {
                        email: req.body.email,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: user.email
                    }, token: authToken
                });
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
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
        phone_number: req.body.phone_number
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {

            req.json("Error: Inserting New User");

            if (err.name == "UserExistsError") {
                req.json({
                    msg:'Registration Error: User Already Exists!'
                });
                req.json('Error: User Already Exists!')
            } else {
                return res.json({
                    title: 'Register',
                    msg: 'registerErrorMessage'
                });
            }
        }
        else {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.json({
                    success: true,
                    msg: 'User Registered Successfully!',
                    username: req.username,
                    email: req.email
                });
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
    req.json({
        msg:'You are log out successgully!'
    });
}