const multer = require('multer');
const { exportArtistsToCSV } = require('../controllers/exportCSV');
const { importArtistsFromCSV } = require('../controllers/import CSV');
const upload = multer({ dest: 'uploads/' });

app.post('/importartists', upload.single('file'), importArtistsFromCSV);
app.get('http://localhost:5000/exportartists', exportArtistsToCSV);
