import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <h1 className='text-4xl mb-4'>404 - Page Not Found</h1>
      <p className='mb-8'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to='/' className='text-blue-500 hover:underline'>
        Go to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
