import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import UserTable from './UserTable';
// import ArtistTable from './ArtistTable';
import authService from '../services/authService';

const Dashboard = () => {
  // const [tab, setTab] = useState('users');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </header>
      <nav className="mb-6">
        <ul>
          <li>
            <Link to="/users" className="text-blue-500 hover:underline">
              Users
            </Link>
          </li>
          <li>
            <Link to="/artists" className="text-blue-500 hover:underline">
              Artists
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
