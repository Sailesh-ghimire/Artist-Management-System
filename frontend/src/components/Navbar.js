import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className=' bg-cyan-900 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>
          <Link to='/' className='hover:text-blue-400 transition duration-300'>
            AMS
          </Link>
        </div>
        <div className='flex items-center space-x-6'>
          <Link
            to='/users'
            className='text-white hover:text-blue-400 transition duration-300'
          >
            Users
          </Link>
          <Link
            to='/artists'
            className='text-white hover:text-blue-400 transition duration-300'
          >
            Artists
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600 text-white p-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
