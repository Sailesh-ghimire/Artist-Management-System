const csvWriter = require('csv-writer').createObjectCsvStringifier;

exports.  exportArtistsToCSV = async (req, res) => {
  try {
    const artists = await pool.query('SELECT * FROM artists');
    const csvStringifier = csvWriter({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'gender', title: 'Gender' },
        { id: 'address', title: 'Address' },
        { id: 'first_release_year', title: 'First Release Year' },
        { id: 'no_of_albums_released', title: 'No. of Albums Released' },
      ]
    });

    const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(artists.rows);

    res.header('Content-Type', 'text/csv');
    res.attachment('artists.csv');
    res.send(csvData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
