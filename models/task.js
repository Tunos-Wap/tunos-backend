let mongoose = require('mongoose');

// create a model class
let taskModel = mongoose.Schema({

    title: {type: String},
    summary: {type: String},
    status: {type: String},
    priority: {type: String},
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    assigned_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    start_date: {type: Date},
    end_date: {type: Date},
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "task"
});

module.exports = mongoose.model('task', taskModel);