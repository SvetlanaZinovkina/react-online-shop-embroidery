import bcrypt from 'bcrypt';
import knex from '../knex.js';

const saltRounds = 6;

class User {
  static async create({ username, email, password }) {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return knex('Users').insert({ username, email, password_hash: passwordHash }).returning('*');
  }

  static async findById(userId) {
    return knex('Users').where({ user_id: userId }).first();
  }

  static async findByEmail(email) {
    return knex('Users').where({ email }).first();
  }

  static async checkPassword(user, password) {
    return bcrypt.compare(password, user.password_hash);
  }
}

export default User;
