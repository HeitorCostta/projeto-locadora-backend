const pool = require('../database/connection');

class RentalsRepository {
  async create({ user_id, car_id, start_date, end_date, total_price }) {
    const query = `
      INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [user_id, car_id, start_date, end_date, total_price];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findOpenByCar(car_id) {
    const query = `
      SELECT * FROM rentals
      WHERE car_id = $1 AND end_date IS NULL;
    `;

    const result = await pool.query(query, [car_id]);
    return result.rows[0];
  }

  async findById(id) {
    const query = `
      SELECT * FROM rentals
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async returnRental(id) {
    const query = `
      UPDATE rentals
      SET end_date = NOW()
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new RentalsRepository();
