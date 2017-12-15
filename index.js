const express  = require('express');

const app = express();
const port = process.env.PORT || 8888;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const keys = require('./config/keys')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const isLoggedIn = require('./middleware/isLoggedIn')

mongoose.connect(keys.mongourl);

require('./config/passport')(passport); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.set('view engine', 'ejs'); 

app.use(session({ 
    secret: keys.cookieKey,
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

