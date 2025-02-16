// const morgan = require('morgan');
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import AppError from './utils/appError.js';
// import globalErrHandler from './controllers/errorController.js';
// const cors = require('cors');
// const express = require('express');
// const globalErrHandler = require('./controllers/errorController');
import userRouter from './router/user-route.js';
// const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(morgan('dev'));

app.use('/users/', userRouter);
// app.use('/properties/', uploadRouter);
// app.use('/bookings/', articleRouter);
app.get('/', (req, res) => res.send('Welcome to lala API'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
