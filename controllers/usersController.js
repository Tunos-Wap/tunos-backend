// create a reference to the model
let User = require('../models/user').User;

/**
 * Find user details action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.details = (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
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
 * Update user action.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.update = (req, res, next) => {

    const updateUser = User({
        _id: req.user._id,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        updated_at: new Date(),
    });

    User.updateOne({_id: req.user._id}, updateUser, err => {
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
