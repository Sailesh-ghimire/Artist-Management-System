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


exports.getAllArtists = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const sqlQuery = 'SELECT * FROM artists ORDER BY id LIMIT $1 OFFSET $2';
    const artists = await pool.query(sqlQuery, [limit, offset]);

    if (!artists.rows) {
      throw new Error('No artists found');
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM artists');
    
    // Ensure countResult has rows and count is present
    if (!countResult.rows || countResult.rows.length === 0) {
      throw new Error('Unable to get artists count');
    }

    const totalArtists = countResult.rows[0].count;
    const totalPages = Math.ceil(totalArtists / limit);
    
    const response = {
      artists: artists.rows,
      currentPage: parseInt(page),
      totalPages: totalPages,
    };
    
    res.json(response);
  } catch (err) {
    console.error('Error fetching artists:', err.message);
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
  const { no_of_albums_released } = req.body;

  try {
    const updatedArtist = await pool.query(
      'UPDATE artists SET no_of_albums_released = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [no_of_albums_released, id]
    );

    if (updatedArtist.rows.length === 0) {
      return res.status(404).send('Artist not found');
    }

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
