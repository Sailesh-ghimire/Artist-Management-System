import React, { useState } from 'react';
import UserTable from './UserTable';
import ArtistTable from './ArtistTable';
import authService from '../services/authService';

const Dashboard = ({ history }) => {
  const [tab, setTab] = useState('users');

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setTab('users')}>Users</button>
      <button onClick={() => setTab('artists')}>Artists</button>
      <button onClick={handleLogout}>Logout</button>

      {tab === 'users' && <UserTable />}
      {tab === 'artists' && <ArtistTable />}
    </div>
  );
};

export default Dashboard;
