const rentalsRepository = require('../repositories/rentalsRepository');
const usersRepository = require('../repositories/usersRepository');
const carsRepository = require('../repositories/carsRepository');

class CreateRentalService {
  async execute({ user_id, car_id, start_date, end_date }) {
    // 1️⃣ Usuário existe?
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new Error('Usuário não existe');
    }

    // 2️⃣ Carro existe?
    const car = await carsRepository.findById(car_id);
    if (!car) {
      throw new Error('Carro não existe');
    }

    // 3️⃣ Carro já está alugado?
    const rentalOpen = await rentalsRepository.findOpenByCar(car_id);
    if (rentalOpen) {
      throw new Error('Carro indisponível');
    }

    // 4️⃣ Calcular total
    const start = new Date(start_date);
    const end = new Date(end_date);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total_price = diffDays * car.daily_rate;

    // 5️⃣ Criar aluguel
    const rental = await rentalsRepository.create({
      user_id,
      car_id,
      start_date,
      end_date,
      total_price
    });

    // 6️⃣ Marcar carro como indisponível
    await carsRepository.updateAvailability(car_id, false);

    return rental;
  }
}

module.exports = new CreateRentalService();
