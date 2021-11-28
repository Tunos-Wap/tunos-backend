/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

const usersController = require('../controllers/usersController');

/* GET Route for the Users List - READ Operation */
router.get('/', requireAuth, usersController.index);

/* GET Route for the Users Details - READ Operation */
router.get('/:id', requireAuth, usersController.details);

/* POST Route for the new Users create - WRITE Operation */
router.post('/', requireAuth, usersController.create);

/* PUT Route for the existing Users update - WRITE Operation */
router.put('/:id', requireAuth, usersController.update);

/* DELETE Route for the existing Users delete - WRITE Operation */
router.delete('/:id', requireAuth, usersController.delete);

module.exports = router;