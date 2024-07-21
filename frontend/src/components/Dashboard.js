import React from 'react';
import { Link } from 'react-router-dom';
// import UserTable from './UserTable';
// import ArtistTable from './ArtistTable';

const Dashboard = () => {

  

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
       
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
