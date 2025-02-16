const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const globalErrHandler = require('./controllers/errorController');

const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(morgan('dev'));

// app.use('/users/', userRouter);
// app.use('/properties/', uploadRouter);
// app.use('/bookings/', articleRouter);
app.get('/', (req, res) => res.send('Welcome to lala API'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrHandler);
module.exports = app;
