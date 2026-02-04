const pool = require('../database/connection');

class UsersRepository {
  async create({ name, email, password_hash }) {
    const query = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [name, email, password_hash];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0];
  }

  async findById(id) {
  const query = `
    SELECT * FROM users
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
}

}

module.exports = new UsersRepository();
