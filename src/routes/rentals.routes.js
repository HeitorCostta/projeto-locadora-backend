const { Router } = require('express');
const createRentalController = require('../controllers/createRentalController');

const rentalsRoutes = Router();

rentalsRoutes.post('/', createRentalController.handle);

module.exports = rentalsRoutes;
