import React, { useState } from 'react';
import userService from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateUserSchema } from '../validations/allValidations';


const UpdateUser = ({ userId, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmitHandler = async (updatedUser) => {
    try {
      // await userService.updateUser(data);
      await userService.updateUser(userId, updatedUser);
      toast.success('User updated successfully');
      onClose();
      onSubmit();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Update User
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="New Password"
              {...register('password')}
              className={`border ${errors.password ? 'border-red-600' : 'border-gray-600'} bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="phone">
              New Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="New Phone"
              {...register('phone')}
              className={`border ${errors.phone ? 'border-red-600' : 'border-gray-600'} bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default UpdateUser;
