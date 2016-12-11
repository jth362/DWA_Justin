var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user');

module.exports = function(app, options){
    return {
        init: function(){
            passport.use(new LocalStrategy(User.authenticate()));
            passport.serializeUser(function(user,done){
                done(null, user._id);
            });
            passport.deserializeUser(function(id, done){
                User.findById(id, function(err, data){
                    if(err || !user) return done(err, null);
                    done(null, user);
                });
            });
            
            app.use(passport.initialize());
            app.use(passport.session());
            
            app.use(function(req, res, next){
                res.locals.user = req.user;
                next();
            });
        },
        registerRoutes: function(){
            app.get('/register', function(req, res){
                res.render('register', {viewName: 'register'});
            });
            app.post('/register', function(req, res, next){
                var newUser = new User({username: req.body.username});
                
                User.register(newUser, req.body.password, function(err, user){
                    if(err){
                        console.log('registration error', err);   
                    }
                    
                    passport.authenticate('local')(req, res, function(){
                        req.session.flash = {
                        type: 'positive',
                        header: 'Registration Success',
                        body: 'Welcome, ' + user.username
                        }
                        res.redirect('/deals')
                    });
                });
            });
            
            app.get('/login', function(req, res){
                res.render('login', {viewName: 'login'});
            });
            app.post('/login', passport.authenticate('local'), function(req,res,next){
                req.session.flash = {
                    type: 'positive',
                    header: 'signed in',
                    body: 'Welcome, ' + req.body.username
                };
                res.redirect('/deals')
                console.log('login successful')
                    });
                }
                }
            }