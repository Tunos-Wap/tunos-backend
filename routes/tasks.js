/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 *  Student Name (Revised on authorcation): Shenkai Feng
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

const tasksController = require('../controllers/tasksController');

/* GET Route for the Tasks List - READ Operation */
router.get('/', tasksController.index);

/* GET Route for the Tasks Details - READ Operation */
router.get('/:id', tasksController.details);

/* POST Route for the new Tasks create - WRITE Operation */
router.post('/create', tasksController.create);

/* PUT Route for the existing Tasks update - WRITE Operation */
router.put('/update/:id', tasksController.update);

/* DELETE Route for the existing Tasks delete - WRITE Operation */
router.delete('/delete/:id', tasksController.delete);

module.exports = router;
