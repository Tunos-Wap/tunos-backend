/**
 * name: main.css
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Date: 19-11-2021
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send({success: true, message: 'Service is up.', data: []});
});

module.exports = router;
