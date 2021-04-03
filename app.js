var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var expressJwt = require('express-jwt');
var cors = require('cors');
var winston = require('./config/winston.js');
var morgan = require('morgan');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream }));
app.use(cookieParser());
app.use(expressJwt({secret: 'sayollo', algorithms: ['HS256']}).unless({path: ['/api/auth/login']}));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)


module.exports = app;
