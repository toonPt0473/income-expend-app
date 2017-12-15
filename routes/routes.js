const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/user');
const Statement = require('../models/statement')

module.exports = function(app, passport, express) {

        app.get('/', function(req, res) {
            res.render('index.ejs' , {user : req.user}); 
        });

        app.get('/login', function(req, res) {    
            res.render('login.ejs', { message: req.flash('loginMessage') }); 
        });
    
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/login',
            failureFlash : true
        }));

        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
    
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', 
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
            const dateModel = new Date()
            const newStatement = new Statement({
                list,
                income,
                amount,
                _user: req.user.id,
                date: {
                    day: dateModel.getDate().toString(),
                    month: (dateModel.getMonth() + 1).toString(),
                    year: dateModel.getFullYear().toString(),
                    dateFormat: `${dateModel.getFullYear().toString()}-${(dateModel.getMonth() + 1).toString()}-${dateModel.getDate().toString()}`,
                    time: dateModel.getTime()
                }
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
                res.send(data)
            })
        })
    
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
    };
