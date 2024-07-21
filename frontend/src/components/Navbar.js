import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // If using React Router for navigation
import authService from '../services/authService';

const Navbar = () => {

  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">DashBoard</Link>
        </div>
        <div className="space-x-4">
        <Link to="/users" className="text-white">Users</Link>
        <Link to="/artists" className="text-white">Artists</Link>
<button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>        </div>
      </div>
    </nav>
  );
};

export default Navbar;
