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

    var filteredQuery = {user_id: req.user._id};

    if(req.query['status']) {
        filteredQuery['status'] = req.query['status'];
    }

    if(req.query['project_id']) {
        filteredQuery['project'] = req.query['project_id'];
    }

    Task.find(filteredQuery,(err, taskList) => {
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

            var model = task;

            if (model.user_id != req.user._id.toString()) {
                return res.status(404).send({
                    success: false,
                    message: 'Not found.'

                });
            }

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
        assigned_user: req.body.assigned_user,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        project_id: req.body.project_id,
        created_by: req.user._id,
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
module.exports.update = async (req, res, next) => {

    const id = req.params.id;
    var task = await Task.findById(id);

    if (task && task.created_by != req.user._id.toString()) {
        return res.status(404).send({
            success: false,
            message: 'Not found.'

        });
    }

    const updateTask = Task({
        _id: id,
        title: req.body.title,
        summary: req.body.summary,
        status: req.body.status,
        priority: req.body.priority,
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
module.exports.delete = async (req, res, next) => {

    var task = await Task.findById(req.params.id);

    if (task && task.created_by != req.user._id.toString()) {

        return res.status(404).send({
            success: false,
            message: 'Not found.'

        });
    }

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
