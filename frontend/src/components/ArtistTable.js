import React, { useState, useEffect } from 'react';
import artistService from '../services/artistService';

const ArtistTable = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    first_release_year: '',
    no_of_albums_released: '',
  });

  useEffect(() => {
    artistService.getAllArtists().then((res) => {
      setArtists(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    artistService.createArtist(newArtist).then((res) => {
      setArtists([...artists, res.data]);
      setNewArtist({
        name: '',
        dob: '',
        gender: '',
        address: '',
        first_release_year: '',
        no_of_albums_released: '',
      });
    });
  };

  return (
    <div>
      <h2>Artists</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newArtist.name}
          onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="DOB"
          value={newArtist.dob}
          onChange={(e) => setNewArtist({ ...newArtist, dob: e.target.value })}
        />
        <select
          value={newArtist.gender}
          onChange={(e) => setNewArtist({ ...newArtist, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Address"
          value={newArtist.address}
          onChange={(e) => setNewArtist({ ...newArtist, address: e.target.value })}
        ></textarea>
        <input
          type="number"
          placeholder="First Release Year"
          value={newArtist.first_release_year}
          onChange={(e) =>
            setNewArtist({ ...newArtist, first_release_year: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Number of Albums Released"
          value={newArtist.no_of_albums_released}
          onChange={(e) =>
            setNewArtist({ ...newArtist, no_of_albums_released: e.target.value })
          }
        />
        <button type="submit">Add Artist</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>First Release Year</th>
            <th>Number of Albums Released</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{artist.dob}</td>
              <td>{artist.gender}</td>
              <td>{artist.address}</td>
              <td>{artist.first_release_year}</td>
              <td>{artist.no_of_albums_released}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistTable;
