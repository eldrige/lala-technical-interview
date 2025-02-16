// const config = require('./config/config');

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('Unhandled exception, shutting down.........');
  process.exit(1);
});

const app = require('./app');
// const connectDB = require('./config/db');

// connectDB();

const PORT = process.env.PORT || 2000;
const server = app.listen(PORT, () =>
  console.log(`Server is running in development mode on port : ${PORT} `)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection, shutting down.........');
  server.close(() => {
    process.exit(1);
  });
});
