const express = require('express');
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getArtistSongs,
  exportArtistsToCSV,
  importArtistsFromCSV,
} = require('../controllers/artistController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', authMiddleware, getAllArtists);
router.post('/', authMiddleware, createArtist);
router.put('/:id', authMiddleware, updateArtist);
router.delete('/:id', authMiddleware, deleteArtist);
router.get('/:artist_id/songs', authMiddleware, getArtistSongs);

router.get('/exportcsv', authMiddleware, exportArtistsToCSV);
router.post(
  '/importcsv',
  authMiddleware,
  upload.single('file'),
  importArtistsFromCSV
);

module.exports = router;
