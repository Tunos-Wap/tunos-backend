/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Date: 19-11-2021
 */
 var express = require('express');
 var router = express.Router();
 
 const usersController = require('../controllers/usersController');

 /* GET Route for the Users Details - READ Operation */
 router.get('/', usersController.details);

 /* PUT Route for the existing Users update - WRITE Operation */
 router.put('/update', usersController.update);
 

 module.exports = router;