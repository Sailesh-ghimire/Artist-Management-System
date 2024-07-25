import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import authService from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from '../validations/allValidations';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await authService.login(data);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-6'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email')}
              className={`border ${
                errors.email ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-300 text-sm font-medium mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password')}
              className={`border ${
                errors.password ? 'border-red-600' : 'border-gray-600'
              } bg-gray-700 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
            disabled={isSubmitting}
          >
            Login{' '}
          </button>
          <p className='mt-6 text-center text-gray-400'>
            <span>Don't have an account? </span>
            <a href='/register' className='text-blue-400 hover:underline'>
              Register
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
