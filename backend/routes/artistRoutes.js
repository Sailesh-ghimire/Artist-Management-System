const express = require('express');
const { getAllArtists, createArtist, updateArtist, deleteArtist, getArtistSongs } = require('../controllers/artistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllArtists);
router.post('/', authMiddleware, createArtist);
router.put('/:id', authMiddleware, updateArtist);
router.delete('/:id', authMiddleware, deleteArtist);
router.get('/:artist_id/songs', authMiddleware, getArtistSongs);

module.exports = router;
