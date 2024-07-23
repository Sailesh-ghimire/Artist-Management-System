import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateUser from './createUser';
import UserTable from './UserTable';
import SongTable from './SongTable';
import userService from '../services/userService';
import artistService from '../services/artistService';
import songService from '../services/songService';
// import UserTable from './UserTable';
// import ArtistTable from './ArtistTable';

const Dashboard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalSongs: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, artists, songs] = await Promise.all([
          userService.getAllUsers(),
          artistService.getAllArtists(),
          // songService.(),
        ]);
        setStats({
          totalUsers: users.data.count,
          totalArtists: artists.data.count,
          totalSongs: songs.data.count,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchData();
  }, []);


  const handleCreateUserClose = () => {
    setShowCreateUserModal(false);
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded shadow">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <h3 className="text-xl font-semibold">Total Artists</h3>
          <p className="text-3xl">{stats.totalArtists}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <h3 className="text-xl font-semibold">Total Songs</h3>
          <p className="text-3xl">{stats.totalSongs}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
