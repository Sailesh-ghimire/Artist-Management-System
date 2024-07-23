import React, { useState } from 'react';
import artistService from '../services/artistService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateArtist = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [firstReleaseYear, setFirstReleaseYear] = useState('');
  const [noOfAlbumsReleased, setNoOfAlbumsReleased] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtist = {
      name,
      dob,
      gender,
      address,
      first_release_year: firstReleaseYear,
      no_of_albums_released: noOfAlbumsReleased,
    };

    try {
      await artistService.createArtist(newArtist);
      toast.success('Artist created successfully');
      onClose();
      onSubmit();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create artist');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Create Artist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          ></textarea>
          <input
            type="number"
            placeholder="First Release Year"
            value={firstReleaseYear}
            onChange={(e) => setFirstReleaseYear(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="number"
            placeholder="Number of Albums Released"
            value={noOfAlbumsReleased}
            onChange={(e) => setNoOfAlbumsReleased(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateArtist;
