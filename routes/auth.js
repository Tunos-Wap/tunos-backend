/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Student Name (Revised on authorization): Shenkai Feng
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

let indexController = require('../controllers/authController');

router.get('/', function (req, res, next) {
  res.json({
    success: true, message: 'Service is up.', data: []
  });
});

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;