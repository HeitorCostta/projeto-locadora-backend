const express = require('express');
const app = express();
const usersRoutes = require('./routes/users.routes')
const carsRoutes = require('./routes/cars.routes');
const rentalsRoutes = require('./routes/rentals.routes');

app.use(express.json());

app.use('/user', usersRoutes);

app.use('/cars', carsRoutes);

app.use('/rentals', rentalsRoutes);

module.exports = app;
