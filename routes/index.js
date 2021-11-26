/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Student Name (Revised on authorcation): Shenkai Feng
 * Date: 19-11-2021
 */
 var express = require('express');
 var router = express.Router();
 
 let indexController = require('../controllers/index');

 router.get('/', function (req, res, next) {
     res.json({
       success: true, message: 'Service is up.', data: []
      });
 });
 

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

 module.exports = router;