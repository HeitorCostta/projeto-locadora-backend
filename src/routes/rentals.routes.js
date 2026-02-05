const { Router } = require('express');
const createRentalController = require('../controllers/createRentalController');
const ReturnRentalController = require("../controllers/returnRentalController");

const rentalsRoutes = Router();

rentalsRoutes.post('/', createRentalController.handle);

rentalsRoutes.post("/:id/return", ReturnRentalController.handle);

module.exports = rentalsRoutes;
