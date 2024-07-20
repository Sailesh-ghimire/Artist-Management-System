// // src/controllers/userController.js
// const pool = require('../config/db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register User
// const registerUser = async (req, res) => {
//   const { first_name, last_name, email, password, phone, dob, gender, address } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const query = 'INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *';
//   const values = [first_name, last_name, email, hashedPassword, phone, dob, gender, address];
  
//   try {
//     const result = await pool.query(query, values);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Login User
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const query = 'SELECT * FROM users WHERE email = $1';
  
//   try {
//     const result = await pool.query(query, [email]);
//     if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    
//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Users
// const getUsers = async (req, res) => {
//   const query = 'SELECT * FROM users';
  
//   try {
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update User
// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { first_name, last_name, email, phone, dob, gender, address } = req.body;
//   const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, dob = $5, gender = $6, address = $7, updated_at = NOW() WHERE id = $8 RETURNING *';
//   const values = [first_name, last_name, email, phone, dob, gender, address, id];
  
//   try {
//     const result = await pool.query(query, values);
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete User
// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  
//   try {
//     const result = await pool.query(query, [id]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser };




const pool = require('../db');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, phone, dob, gender, address } = req.body;

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
  const { first_name, last_name, email, phone, dob, gender, address } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, dob = $5, gender = $6, address = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [first_name, last_name, email, phone, dob, gender, address, id]
    );
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
