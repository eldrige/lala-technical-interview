// const handleValidationError = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };

// const handleJWTExpiredError = () =>
//   new AppError('Your token has expired, please login again', 401);

// const sendErrDev = (err, res) => {
//   // operational errors, are errors expected to occur e.g bad input
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//       error: err,
//       stack: err.stack,
//     });
//   } else {
//     console.error('Error', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong',
//     });
//   }
// };

// const sendErrProd = (err, res) => {
//   console.error('Coming from the global error handler', err);
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     error: err,
//     stack: err.stack,
//   });
// };

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   if (process.env.NODE_ENV === 'development') {
//     sendErrDev(err, res);
//   } else if (process.env.NODE_ENV === 'production') {
//     let error = { ...err };
//     if (err.name === 'ValidationError') error = handleValidationError(error);
//     sendErrProd(error, res);
//   }
// };
