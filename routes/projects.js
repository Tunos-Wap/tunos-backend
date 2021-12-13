/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 *  * Student Name (Revised on authorcation): Shenkai Feng
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

const projectsController = require('../controllers/projectsController');

/* GET Route for the Projects List - READ Operation */
router.get('/', projectsController.index);

/* GET Route for the Projects Details - READ Operation */
router.get('/:id', projectsController.details);

/* POST Route for the new Projects create - WRITE Operation */
router.post('/create', projectsController.create);

/* PUT Route for the existing Projects update - WRITE Operation */
router.put('/update/:id', projectsController.update);

/* DELETE Route for the existing Projects delete - WRITE Operation */
router.delete('/delete/:id', projectsController.delete);

module.exports = router;
