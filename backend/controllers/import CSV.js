const csv = require('csv-parser');
const fs = require('fs');

exports.importArtistsFromCSV = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const promises = results.map(artist => {
            return pool.query(
              'INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES ($1, $2, $3, $4, $5, $6)',
              [artist.name, artist.dob, artist.gender, artist.address, artist.first_release_year, artist.no_of_albums_released]
            );
          });
          await Promise.all(promises);
          res.send('Artists imported successfully');
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
