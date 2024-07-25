const csvWriter = require('csv-writer').createObjectCsvStringifier;
const pool = require('../db');
const csv = require('csv-parser');
const fs = require('fs');

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

    if (!countResult.rows || countResult.rows.length === 0) {
      throw new Error('Unable to get artists count');
    }

    const totalArtists = countResult.rows[0].count;
    const totalPages = Math.ceil(totalArtists / limit);

    const response = {
      artists: artists.rows,
      currentPage: parseInt(page),
      totalPages: totalPages,
      count: parseInt(totalArtists),
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching artists:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createArtist = async (req, res) => {
  const {
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = req.body;

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
    const songs = await pool.query('SELECT * FROM music WHERE artist_id = $1', [
      artist_id,
    ]);
    res.json(songs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.exportArtistsToCSV = async (req, res) => {
  try {
    const artists = await pool.query('SELECT * FROM artists');
    const csvStringifier = csvWriter({
      header: [
        { id: 'id', title: 'Artist ID' },
        { id: 'name', title: 'Name' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'gender', title: 'Gender' },
        { id: 'address', title: 'Address' },
        { id: 'first_release_year', title: 'First Release Year' },
        { id: 'no_of_albums_released', title: 'No. of Albums Released' },
      ],
    });

    const formattedArtists = artists.rows.map(artist => ({
      ...artist,
      dob: new Date(artist.dob).toISOString().split('T')[0],
    }));

    const csvData =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(formattedArtists);

    res.header('Content-Type', 'text/csv');
    res.attachment('artists.csv');
    res.send(Buffer.from(csvData, 'utf8'));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.importArtistsFromCSV = async (req, res) => {
  try {
    const file = req.file;
    const results = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', async () => {
        for (const artist of results) {
          const {
            Name,
            'Date of Birth': dob,
            Gender: gender,
            Address: address,
            'First Release Year': first_release_year,
            'No. of Albums Released': no_of_albums_released,
          } = artist;

          const dobFormatted = dob ? new Date(dob).toISOString() : null;
          const firstReleaseYear = parseInt(first_release_year, 10) || null;
          const noOfAlbumsReleased =
            parseInt(no_of_albums_released, 10) || null;

          await pool.query(
            'INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES ($1, $2, $3, $4, $5, $6)',
            [
              Name,
              dobFormatted,
              gender,
              address,
              firstReleaseYear,
              noOfAlbumsReleased,
            ]
          );
        }
        res.send('Artists imported successfully');
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
