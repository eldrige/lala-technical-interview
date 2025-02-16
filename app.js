// const morgan = require('morgan');
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import AppError from './utils/appError.js';
import userRouter from './router/user-routes.js';
import propertyRouter from './router/property-routes.js';
import bookingRouter from './router/booking-routes.js';

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/properties', propertyRouter);
app.use('/bookings', bookingRouter);

// app.use('/properties/', uploadRouter);
// app.use('/bookings/', articleRouter);
app.get('/', (req, res) => res.send('Welcome to lala API'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
