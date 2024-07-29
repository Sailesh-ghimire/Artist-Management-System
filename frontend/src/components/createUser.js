import React from 'react';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSchema } from '../validations/allValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateUser = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitHandler = async data => {
    try {
      await userService.createUser(data);
      toast.success('User created successfully');
      onSubmit();

      onClose();
      toast.success('successful');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create user');
    }
  };

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg'>
      <h2 className='text-2xl font-bold text-white mb-6 text-center'>
        Create User
      </h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='flex-1'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='firstName'
            >
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              placeholder='First Name'
              {...register('first_name')}
              className={`border ${
                errors.firstName ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.firstName && (
              <p className='text-red-600 text-sm'>{errors.firstName.message}</p>
            )}
          </div>
          <div className='flex-1'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              placeholder='Last Name'
              {...register('last_name')}
              className={`border ${
                errors.lastName ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.lastName && (
              <p className='text-red-600 text-sm'>{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-300 text-sm font-medium mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            {...register('email')}
            className={`border ${
              errors.email ? 'border-red-600' : 'border-gray-600'
            } bg-gray-700 text-white p-2 rounded w-full`}
          />
          {errors.email && (
            <p className='text-red-600 text-sm'>{errors.email.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-300 text-sm font-medium mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            {...register('password')}
            className={`border ${
              errors.password ? 'border-red-600' : 'border-gray-600'
            } bg-gray-700 text-white p-2 rounded w-full`}
          />
          {errors.password && (
            <p className='text-red-600 text-sm'>{errors.password.message}</p>
          )}
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='flex-1'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='phone'
            >
              Phone
            </label>
            <input
              type='text'
              id='phone'
              placeholder='Phone'
              {...register('phone')}
              className={`border ${
                errors.phone ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-2 rounded w-full`}
            />
            {errors.phone && (
              <p className='text-red-600 text-sm'>{errors.phone.message}</p>
            )}
          </div>
          <div className='flex-1'>
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
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          >
            Create
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default CreateUser;
