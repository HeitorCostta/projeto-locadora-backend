const createRentalService = require('../services/createRentalService');

class CreateRentalController {
  async handle(req, res) {
    const { user_id, car_id, start_date, end_date } = req.body;

    const rental = await createRentalService.execute({
      user_id,
      car_id,
      start_date,
      end_date
    });

    return res.status(201).json(rental);
  }
}

module.exports = new CreateRentalController();
