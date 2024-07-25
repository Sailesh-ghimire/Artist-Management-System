import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import artistService from '../services/artistService';
import songService from '../services/songService';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: null,
    totalArtists: null,
    totalSongs: null,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, artists, songs] = await Promise.all([
          userService.getAllUsers(),
          artistService.getAllArtists(),
          songService.getSongsCount(),
        ]);

        setStats({
          totalUsers: users.data.count,
          totalArtists: artists.data.count,
          totalSongs: songs.totalSongs,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        toast.error('Failed to fetch dashboard stats');
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-6 bg-gray-900 min-h-screen flex flex-col'>
      <h2 className='text-3xl font-bold text-white mb-6'>
        ARTIST MANAGEMENT SYSTEM (AMS)
      </h2>
      <div className='mb-6'>
        <p className='text-lg text-gray-400 mb-2'>
          Welcome back! Here's a quick overview of our system stats:
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <Link to='/users'>
          <div className='p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105'>
            <h3 className='text-2xl font-semibold text-white mb-2'>
              Total Users
            </h3>
            <p className='text-4xl font-bold text-blue-400'>
              {error
                ? 'Failed to fetch data'
                : stats.totalUsers !== null
                ? stats.totalUsers
                : 'Loading...'}
            </p>
          </div>
        </Link>
        <Link to='/artists'>
          <div className='p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105'>
            <h3 className='text-2xl font-semibold text-white mb-2'>
              Total Artists
            </h3>
            <p className='text-4xl font-bold text-blue-400'>
              {error
                ? 'Failed to fetch data'
                : stats.totalArtists !== null
                ? stats.totalArtists
                : 'Loading...'}
            </p>
          </div>
        </Link>
        <div className='p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105'>
          <h3 className='text-2xl font-semibold text-white mb-2'>
            Total Songs
          </h3>
          <p className='text-4xl font-bold text-blue-400'>
            {error
              ? 'Failed to fetch data'
              : stats.totalSongs !== null
              ? stats.totalSongs
              : 'Loading...'}
          </p>
        </div>
      </div>
      <Link
        to='/csv'
        className='p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-200'
      >
        <h3 className='text-xl font-semibold text-white mb-2'>
          Import/Export Artists Data
        </h3>
        <p className='text-gray-300'>
          Use this feature to import or export artist data through CSV files.
          Click here to access the import/export tool.
        </p>
      </Link>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
