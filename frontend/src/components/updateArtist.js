import React, { useState } from 'react';
import artistService from '../services/artistService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateArtist = ({ artistId, onClose, onUpdate }) => {

  const [no_of_albums_released, setNoOfAlbumsReleased] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedArtist = {
        no_of_albums_released
      };
    try {
      await artistService.updateArtist(artistId, updatedArtist);
      toast.success('Artist updated successfully');
      onClose();
      onUpdate(); // Call the onUpdate callback
    } catch (err) {
      console.error(err);
      toast.error('Failed to update artist');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Update Artist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Number of Albums Released"
            value={no_of_albums_released}
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
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateArtist;
