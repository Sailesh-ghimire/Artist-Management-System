const pool = require('../db');

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await pool.query('SELECT * FROM artists');
    res.json(artists.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createArtist = async (req, res) => {
  const { name, dob, gender, address, first_release_year, no_of_albums_released } = req.body;

  try {
    const newArtist = await pool.query(
      'INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, dob, gender, address, first_release_year, no_of_albums_released]
    );
    res.json(newArtist.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, dob, gender, address, first_release_year, no_of_albums_released } = req.body;

  try {
    const updatedArtist = await pool.query(
      'UPDATE artists SET name = $1, dob = $2, gender = $3, address = $4, first_release_year = $5, no_of_albums_released = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [name, dob, gender, address, first_release_year, no_of_albums_released, id]
    );
    res.json(updatedArtist.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM artists WHERE id = $1', [id]);
    res.json({ msg: 'Artist deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getArtistSongs = async (req, res) => {
  const { artist_id } = req.params;

  try {
    const songs = await pool.query('SELECT * FROM music WHERE artist_id = $1', [artist_id]);
    res.json(songs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
