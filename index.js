const express  = require('express');

const app = express();
const port = process.env.PORT || 5555;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const isLoggedIn = require('./middleware/isLoggedIn')

mongoose.connect('mongodb://ttoonoott:3074621a0473@ds135866.mlab.com:35866/income-expense');

require('./config/passport')(passport); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.set('view engine', 'ejs'); 

app.use(session({ 
    secret: 'toonpttoonpttoonpttoonpt',
    cookie: { maxAge: 2592000000 },
    resave: false,
    saveUninitialized: false
})); 
app.use(passport.initialize()); // ไปดูโค้ด
app.use(passport.session()); // ไปดูโค้ด
app.use(flash()); 

require('./routes/routes.js')(app, passport, express);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*' , isLoggedIn , (req , res)  => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'))
    })
}

app.listen(port);

