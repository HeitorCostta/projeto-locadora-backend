const express = require('express');
const createUserController = require('../controllers/createUserController');

const router = express.Router();

router.post('/', (req, res) => {
  return createUserController.handle(req, res);
});

module.exports = router;
