const rentalsRepository = require("../repositories/rentalsRepository");
const carsRepository = require("../repositories/carsRepository");

class ReturnRentalService {
  async execute(rental_id) {
    const rental = await rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new Error("Aluguel não encontrado");
    }

    if (rental.end_date) {
      throw new Error("Este aluguel já foi devolvido");
    }

    const returnedRental = await rentalsRepository.returnRental(rental_id);

    await carsRepository.updateAvailability(rental.car_id, true);

    return returnedRental;
  }
}

module.exports = ReturnRentalService;
