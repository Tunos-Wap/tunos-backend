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

 /* GET Route for the Projects List - READ Operation */
 router.get('/',requireAuth, projectsController.index);
 
 /* GET Route for the Projects Details - READ Operation */
 router.get('/:id',requireAuth, projectsController.details);
 
 /* POST Route for the new Projects create - WRITE Operation */
 router.post('/',requireAuth, projectsController.create);
 
 /* PUT Route for the existing Projects update - WRITE Operation */
 router.put('/:id',requireAuth, projectsController.update);
 
 /* DELETE Route for the existing Projects delete - WRITE Operation */
 router.delete('/:id',requireAuth, projectsController.delete);
 
 module.exports = router;