let mongoose = require('mongoose');

// create a model class
let projectModel = mongoose.Schema({

    friendly_id: {type: String},
    title: {type: String},
    description: {type: String},
    status: {type: String},
    start_date: {type: Date},
    end_date: {type: Date},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    users: [mongoose.Schema.Types.ObjectId],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "project"
});

module.exports = mongoose.model('project', projectModel);