import React, { useState, useEffect } from 'react';
import songService from '../services/songService';

const SongTable = ({ artistId }) => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    artist_id: artistId,
    title: '',
    album_name: '',
    genre: '',
  });

  useEffect(() => {
    songService.getSongsByArtist(artistId).then((res) => {
      setSongs(res.data);
    });
  }, [artistId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    songService.createSong(newSong).then((res) => {
      setSongs([...songs, res.data]);
      setNewSong({
        artist_id: artistId,
        title: '',
        album_name: '',
        genre: '',
      });
    });
  };

  const handleEdit = (song) => {
    setNewSong(song);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    songService.updateSong(newSong.id, newSong).then((res) => {
      const updatedSongs = songs.map((song) =>
        song.id === res.data.id ? res.data : song
      );
      setSongs(updatedSongs);
      setNewSong({
        artist_id: artistId,
        title: '',
        album_name: '',
        genre: '',
      });
    });
  };

  const handleDelete = (id) => {
    songService.deleteSong(id).then(() => {
      const updatedSongs = songs.filter((song) => song.id !== id);
      setSongs(updatedSongs);
    });
  };

  return (
    <div>
      <h2>Songs</h2>
      <form onSubmit={newSong.id ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Album Name"
          value={newSong.album_name}
          onChange={(e) => setNewSong({ ...newSong, album_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={newSong.genre}
          onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
          required
        />
        <button type="submit">{newSong.id ? 'Update' : 'Add'} Song</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Album Name</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.album_name}</td>
              <td>{song.genre}</td>
              <td>
                <button onClick={() => handleEdit(song)}>Edit</button>
                <button onClick={() => handleDelete(song.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
