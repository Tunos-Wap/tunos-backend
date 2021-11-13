// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.Schema({

    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email address is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'Password is required'
    },
    first_name: {
        type: String,
        default: '',
        trim: true,
        required: 'First Name is required'
    },
    last_name: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    phone_number: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "users"
});

// configure options for User Model

const options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);