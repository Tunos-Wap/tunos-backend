// create a reference to the model
let Task = require('../models/task');

/**
 * List all tasks action.
 *
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    Task.find((err, taskList) => {
        if (err) {
            console.error(err);
            return res.send({
                success: false,
                message: 'Tasks fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'Tasks successfully found.',
                data: taskList, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

/**
 * Find task details action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.details = (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) {
            console.error(err);

            return res.send({
                success: false,
                message: 'Task fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'Task successfully found.',
                data: task, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

/**
 * Create task action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.create = (req, res, next) => {
    const newTask = Task({
        title: req.body.title,
        summary: req.body.summary,
        status: req.body.status,
        priority: req.body.priority,
        created_by: req.body.created_by,
        assigned_user: req.body.assigned_user,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        project_id: req.body.project_id,
        created_at: new Date(),
        updated_at: new Date(),
    });

    Task.create(newTask, (err, Task) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: err.message,
                data: []
            });
        }

        return res.send({
            success: true,
            message: 'Task successfully created.',
            data: Task, 
            displayName: req.user ? req.user.displayName : ''
        });
    });
}


/**
 * Update task action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateTask = Task({
        _id: id,
        title: req.body.title,
        summary: req.body.summary,
        status: req.body.status,
        priority: req.body.priority,
        created_by: req.body.created_by,
        assigned_user: req.body.assigned_user,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        project_id: req.body.project_id,
        updated_at: new Date(),
    });

    Task.updateOne({_id: id}, updateTask, err => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: err.message,
                data: []
            });
        }

        return res.send({
            success: true,
            message: 'Task successfully updated.',
            data: [], 
            displayName: req.user ? req.user.displayName : ''
        });
    });
}

/**
 * Delete task action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.delete = (req, res, next) => {
    Task.remove({_id: req.params.id}, err => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: err.message,
                data: []
            });
        }

        return res.send({
            success: true,
            message: 'Task successfully deleted.',
            data: [], 
            displayName: req.user ? req.user.displayName : ''
        });
    });
}
