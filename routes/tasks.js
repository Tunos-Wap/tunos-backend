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

 // helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
 
 /* GET Route for the Tasks List - READ Operation */
 router.get('/', requireAuth,tasksController.index);
 
 /* GET Route for the Tasks Details - READ Operation */
 router.get('/:id',requireAuth, tasksController.details);
 
 /* POST Route for the new Tasks create - WRITE Operation */
 router.post('/',requireAuth, tasksController.create);
 
 /* PUT Route for the existing Tasks update - WRITE Operation */
 router.put('/:id',requireAuth, tasksController.update);
 
 /* DELETE Route for the existing Tasks delete - WRITE Operation */
 router.delete('/:id',requireAuth, tasksController.delete);
 
 module.exports = router;