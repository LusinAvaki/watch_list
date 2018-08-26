const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const models = require('./models/index');
const {moviesRoutes, usersRoutes, publicRoutes} = require('./routes/index');

const ErrorHandler = require('./middleware/error-handler')
const ErrorsUtil = require('./util/errors.util')
const {PathNotFoundError} = ErrorsUtil

const app = express();

app.use(morgan('dev'));

/**
 * @description Middleware - body parser:
 * 1. Parses the text as URL encoded data (limit 5 mb).
 * 2. Parses the text as JSON & exposes the resulting object on req.body (limit 5 mb).
 */
app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));
app.use(bodyParser.json({limit: '5mb'}));

app.use('/', publicRoutes);
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => next(new PathNotFoundError('The specified resource path does not exist.')));

app.use(ErrorHandler.handleError);

module.exports = app;