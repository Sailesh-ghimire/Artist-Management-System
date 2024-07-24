const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const { exportArtistsToCSV, importArtistsFromCSV } = require('./controllers/artistController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);


app.get('/exportartists', exportArtistsToCSV);
app.post('/importartists', upload.single('file'), importArtistsFromCSV);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

