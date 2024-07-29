import React from 'react';
import artistService from '../services/artistService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { artistSchema } from '../validations/allValidations';

const CreateArtist = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(artistSchema),
  });

  const onSubmitHandler = async data => {
    try {
      await artistService.createArtist(data);
      toast.success('Artist created successfully');
      onClose();
      onSubmit();
      toast.success(' Successful');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create artist');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          Create Artist
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='name'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              placeholder='Name'
              {...register('name')}
              className={`border ${
                errors.name ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='dob'
            >
              Date of Birth
            </label>
            <input
              type='date'
              id='dob'
              placeholder='Date of Birth'
              {...register('dob')}
              className={`border ${
                errors.dob ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.dob && (
              <p className='text-red-600 text-sm'>{errors.dob.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='gender'
            >
              Gender
            </label>
            <select
              id='gender'
              {...register('gender')}
              className={`border ${
                errors.gender ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
            {errors.gender && (
              <p className='text-red-600 text-sm'>{errors.gender.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='address'
            >
              Address
            </label>
            <textarea
              id='address'
              placeholder='Address'
              {...register('address')}
              className={`border ${
                errors.address ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full h-16 resize-none`}
            ></textarea>
            {errors.address && (
              <p className='text-red-600 text-sm'>{errors.address.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='firstReleaseYear'
            >
              First Release Year
            </label>
            <input
              type='number'
              id='firstReleaseYear'
              placeholder='First Release Year'
              {...register('first_release_year')}
              className={`border ${
                errors.firstReleaseYear ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.firstReleaseYear && (
              <p className='text-red-600 text-sm'>
                {errors.firstReleaseYear.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='noOfAlbumsReleased'
            >
              Number of Albums Released
            </label>
            <input
              type='number'
              id='noOfAlbumsReleased'
              placeholder='Number of Albums Released'
              {...register('no_of_albums_released')}
              className={`border ${
                errors.noOfAlbumsReleased ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.noOfAlbumsReleased && (
              <p className='text-red-600 text-sm'>
                {errors.noOfAlbumsReleased.message}
              </p>
            )}
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
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

export default CreateArtist;
