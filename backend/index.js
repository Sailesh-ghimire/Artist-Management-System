const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const pool = require('./db');


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);


app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Simple query to test the connection
    res.json({ message: 'Database connection successful', time: result.rows[0] });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

