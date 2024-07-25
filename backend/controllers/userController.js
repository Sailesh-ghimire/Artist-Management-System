const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const sqlQuery = 'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2';
    const users = await pool.query(sqlQuery, [limit, offset]);
    if (!users.rows) {
      throw new Error('No users found');
    }
    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    if (!countResult.rows || countResult.rows.length === 0) {
      throw new Error('Unable to get users count');
    }
    const totalUsers = countResult.rows[0].count;
    const totalPages = Math.ceil(totalUsers / limit);
    const response = {
      users: users.rows,
      currentPage: parseInt(page),
      totalPages: totalPages,
      count: parseInt(totalUsers),
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
  } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [first_name, last_name, email, password, phone, dob, gender, address]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, phone } = req.body;

  try {
    if (!password || !phone) {
      return res.status(400).send('Password and phone number are required');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await pool.query(
      'UPDATE users SET password = $1, phone = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [hashedPassword, phone, id]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
