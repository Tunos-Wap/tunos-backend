// create a reference to the model
let Project = require('../models/project');

/**
 * List all projects action.
 *
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    Project.find((err, projectList) => {
        if (err) {
            console.error(err);
            return res.send({
                success: false,
                message: 'Projects fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'Projects successfully found.',
                data: projectList
            });
        }
    });
}

/**
 * Find project details action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.details = (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {
            console.error(err);

            return res.send({
                success: false,
                message: 'Project fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'Project successfully found.',
                data: project
            });
        }
    });
}

/**
 * Create project action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.create = (req, res, next) => {
    const newProject = Project({
        friendly_id: req.body.friendly_id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        user_id: req.body.user_id,
        created_at: new Date(),
        updated_at: new Date(),
    });

    Project.create(newProject, (err, Project) => {
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
            message: 'Project successfully created.',
            data: Project
        });
    });
}


/**
 * Update project action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateProject = Project({
        _id: id,
        friendly_id: req.body.friendly_id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        user_id: req.body.user_id,
        updated_at: new Date(),
    });

    Project.updateOne({_id: id}, updateProject, err => {
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
            message: 'Project successfully updated.',
            data: []
        });
    });
}

/**
 * Delete project action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.delete = (req, res, next) => {
    Project.remove({_id: req.params.id}, err => {
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
            message: 'Project successfully deleted.',
            data: []
        });
    });
}