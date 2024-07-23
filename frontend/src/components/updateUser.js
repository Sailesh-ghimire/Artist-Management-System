import React, { useState } from 'react';
import userService from '../services/userService';

const UpdateUser = ({ userId, onClose }) => {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      password,
      phone,
    };

    try {
      await userService.updateUser(userId, updatedUser);
      alert('User updated successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="New Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
    </div>
  );
};

export default UpdateUser;
