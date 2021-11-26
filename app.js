/**
 * name: app.js
 * Student ID: 301166451
 * Student Name: Rahilkumar Patel
 * Student Name (Revised on user login): Shenkai Feng
 * Date: 02-10-2021
 */

 const createError = require('http-errors');
 const express = require('express');
 const path = require('path');
 const cookieParser = require('cookie-parser');
 const logger = require('morgan');
 let cors = require('cors');
 
 // authentication libs.
 const session = require('express-session');
 const passport = require('passport');
 const passportJWT = require('passport-jwt');
 const JWTStrategy = passportJWT.Strategy;
 const ExtractJWT = passportJWT.ExtractJwt;
 
 let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;

 // database connection
 const mongoose = require('mongoose');
 const DB = require('./config/db');
 
 // connect to mongoose
 mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
 const mongoDB = mongoose.connection;
 mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
 mongoDB.once('open', () => {
     console.log('Connected to MongoDB...');
 });
 
 
 const app = express();
 
 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 
 //setup express session
 app.use(session({
     secret: "4b70e058a4791397b3f4d56efcf8e86a1c1f806cd6708d79491eaec0c083319ce73fd78f802c64cd4507032a85179297",
     saveUninitialized: false,
     resave: false
 }));
 
 // initialize passport
 app.use(passport.initialize());
 app.use(passport.session());
 
 // create a User Model Instance
 const userModel = require('./models/user');
 const User = userModel.User;
 
 // implement a User Authentication Strategy
 passport.use(User.createStrategy());
 
 // serialize and deserialize the User info
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 
 const jwtOptions = {};
 jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
 jwtOptions.secretOrKey = DB.Secret;
 
 const strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
     User.findById(jwt_payload.id)
         .then(user => {
             return done(null, user);
         })
         .catch(err => {
             return done(err, false);
         });
 });
 
 passport.use(strategy);
 
 // Include Routes.
 const indexRouter = require('./routes/index');
 const projectsRouter = require('./routes/projects');
 const usersRouter = require('./routes/users');
 const tasksRouter = require('./routes/tasks');
 
 app.use('/', indexRouter);
 app.use('/projects', projectsRouter);
 app.use('/users', usersRouter);
 app.use('/tasks', tasksRouter);
 
 // catch 404 and forward to error handler
 app.use(function (req, res, next) {
     next(createError(404));
 });
 
 // error handler
 app.use(function (err, req, res, next) {
     console.log(err);
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.nav = '404';
     res.locals.user = undefined;
     res.locals.error = req.app.get('env') === 'development' ? err : {};
 
     // render the error page
     res.status(err.status || 500);
     res.render('error');
 });
 
 module.exports = app;