const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/user');
const Statement = require('../models/statement');
const keys = require('../config/keys')

module.exports = function(app, passport, express) {

        app.get('/', function(req, res) {
            res.render('index.ejs' , {user : req.user}); 
        });

        app.get('/login', function(req, res) {    
            res.render('login.ejs', { message: req.flash('loginMessage') , user : req.user}); 
        });
    
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : keys.successLoginRedirect,
            failureRedirect : '/login',
            failureFlash : true
        }));

        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') , user : req.user});
        });
    
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', 
            failureRedirect : '/signup',
            failureFlash : true 
        }));
    
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user 
            });
        });

        app.get('/api/statement' , isLoggedIn , (req , res) => {
            Statement.find({_user: req.user.id} , (err , statements) => {
                if(err) throw err;
                res.send(statements)
            })
        })

        app.post('/api/new/statement' , isLoggedIn ,(req , res) => {
            const { list , income , amount , date} = req.body;
            console.log(list , income , amount , date)
            const newStatement = new Statement({
                list,
                income,
                amount,
                _user: req.user.id,
                date
            })
            newStatement.save((err ,statements) => {
                if(err) throw err;
                res.send(statements)
            })
        })

        app.post('/api/update/statement' , isLoggedIn , (req , res) => {
            //findoneandupdate
        })

        app.get('/api/delete/statement/:id' , isLoggedIn , (req ,res) => {
            Statement.findOneAndRemove({_id : req.params.id} , (err , data) => {
                if(err) throw err;
                res.redirect('/dashboard')
            })
        })
    
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
    };
