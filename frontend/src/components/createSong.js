import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import songService from '../services/songService';

const CreateSong = ({ onClose, onSubmit }) => {
  const [artistId, setArtistId] = useState('');
  const [title, setTitle] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!artistId || !title || !albumName || !genre) {
      toast.error('All fields are required.');
      return;
    }

    const songData = {
      artist_id: Number(artistId),
      title,
      album_name: albumName,
      genre,
    };
    try {
      await songService.createSong(songData);
      toast.success('Song created successfully.');
      onSubmit(songData);
      onClose();
    } catch (error) {
      toast.error('Error creating song.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-white mb-4'>Create Song</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='artistId'
              className='block text-sm font-medium text-white'
            >
              Artist ID
            </label>
            <input
              type='number'
              id='artistId'
              value={artistId}
              onChange={e => setArtistId(e.target.value)}
              className='mt-1 p-2 w-full bg-gray-800 text-white border border-gray-700 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-white'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='mt-1 p-2 w-full bg-gray-800 text-white border border-gray-700 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='albumName'
              className='block text-sm font-medium text-white'
            >
              Album Name
            </label>
            <input
              type='text'
              id='albumName'
              value={albumName}
              onChange={e => setAlbumName(e.target.value)}
              className='mt-1 p-2 w-full bg-gray-800 text-white border border-gray-700 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='genre'
              className='block text-sm font-medium text-white'
            >
              Genre
            </label>
            <input
              type='text'
              id='genre'
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className='mt-1 p-2 w-full bg-gray-800 text-white border border-gray-700 rounded'
              required
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300'
            >
              Create
            </button>
          </div>
        </form>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default CreateSong;
