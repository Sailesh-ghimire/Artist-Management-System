const pool = require('../db');

exports.createSong = async (req, res) => {
  const { artist_id, title, album_name, genre } = req.body;

  try {
    const newSong = await pool.query(
      'INSERT INTO music (artist_id, title, album_name, genre) VALUES ($1, $2, $3, $4) RETURNING *',
      [artist_id, title, album_name, genre]
    );
    res.json(newSong.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, album_name, genre } = req.body;

  try {
    const updatedSong = await pool.query(
      'UPDATE music SET title = $1, album_name = $2, genre = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, album_name, genre, id]
    );
    res.json(updatedSong.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM music WHERE id = $1', [id]);
    res.json({ msg: 'Song deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
