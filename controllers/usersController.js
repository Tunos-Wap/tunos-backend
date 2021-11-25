// create a reference to the model
let User = require('../models/user').User;

/**
 * List all users action.
 *
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    User.find((err, userList) => {
        if (err) {
            console.error(err);
            return res.send({
                success: false,
                message: 'Users fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'Users successfully found.',
                data: userList
            });
        }
    });
}

/**
 * Find user details action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.details = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.error(err);
            return res.send({
                success: false,
                message: 'User fetch error occurred.',
                data: []
            });
        } else {

            return res.send({
                success: true,
                message: 'User successfully found.',
                data: user
            });
        }
    });
}

/**
 * Create user action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.create = (req, res, next) => {
    const newUser = User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        created_at: new Date(),
        updated_at: new Date(),
    });

    console.log(newUser);

    User.create(newUser, (err, User) => {
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
            message: 'User successfully created.',
            data: User
        });
    });
}


/**
 * Update user action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateUser = User({
        _id: id,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        updated_at: new Date(),
    });

    User.updateOne({_id: id}, updateUser, err => {
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
            message: 'User successfully updated.',
            data: []
        });
    });
}

/**
 * Delete user action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.delete = (req, res, next) => {
    User.remove({_id: req.params.id}, err => {
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
            message: 'User successfully deleted.',
            data: []
        });
    });
}