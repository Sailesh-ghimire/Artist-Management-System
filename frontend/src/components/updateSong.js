import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import songService from '../services/songService';

const UpdateSong = ({ songId, onClose, onUpdate }) => {
  const [artistId, setArtistId] = useState('');
  const [title, setTitle] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [genre, setGenre] = useState('');

//   useEffect(() => {
//     const fetchSong = async () => {
//       try {
//         const response = await songService.updateSong(songId);
//         const { artist_id, title, album_name, genre } = response.data;
//         setArtistId(artist_id);
//         setTitle(title);
//         setAlbumName(album_name);
//         setGenre(genre);
//       } catch (err) {
//         toast.error('Failed to fetch song details');
//       }
//     };

//     fetchSong();
//   }, [songId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSong = {
      artist_id: Number(artistId),
      title,
      album_name: albumName,
      genre,
    };

    try {
      await songService.updateSong(songId, updatedSong);
      toast.success('Song updated successfully');
      onClose();
      onUpdate(); // Call the onUpdate callback
    } catch (err) {
      console.error(err);
      toast.error('Failed to update song');
    }
  };

  const handleArtistIdChange = (e) => {
    const value = e.target.value;
    if (value === '' || value >= 0) { 
      setArtistId(value);
    }
  };


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white mb-4">Update Song</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="number"
            min="0"
            placeholder="Artist ID"
            value={artistId}
            onChange={handleArtistIdChange}
            required
            className="mb-4 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-4 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required
            className="mb-4 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="mb-4 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateSong;
