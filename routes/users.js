/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

/* GET Route for the Users List - READ Operation */
router.get('/', usersController.index);

/* GET Route for the Users Details - READ Operation */
router.get('/:id', usersController.details);

/* POST Route for the new Users create - WRITE Operation */
router.post('/', usersController.create);

/* PUT Route for the existing Users update - WRITE Operation */
router.put('/:id', usersController.update);

/* DELETE Route for the existing Users delete - WRITE Operation */
router.delete('/:id', usersController.delete);

module.exports = router;
