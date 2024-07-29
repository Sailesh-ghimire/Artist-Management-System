import React from 'react';
import artistService from '../services/artistService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateArtistSchema } from '../validations/allValidations';

const UpdateArtist = ({ artistId, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateArtistSchema),
  });

  const onSubmitHandler = async data => {
    try {
      await artistService.updateArtist(artistId, data);
      toast.success('Artist updated successfully');
      onClose();
      onSubmit();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update artist');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          Update Artist
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
          <div className='mb-4'>
            <label
              htmlFor='no_of_albums_released'
              className='block text-gray-300 text-sm font-medium mb-2'
            >
              Number of Albums Released
            </label>
            <input
              type='number'
              id='no_of_albums_released'
              placeholder='Number of Albums Released'
              {...register('no_of_albums_released')}
              className={`border ${
                errors.no_of_albums_released
                  ? 'border-red-600'
                  : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.no_of_albums_released && (
              <p className='text-red-600 text-sm'>
                {errors.no_of_albums_released.message}
              </p>
            )}
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-2 px-4 py-2 bg-gray-500 text-white rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default UpdateArtist;
