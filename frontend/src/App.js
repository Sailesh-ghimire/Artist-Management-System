import './index.css';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute';
import authService from './services/authService';
import UserTable from './components/UserTable';
import ArtistTable from './components/ArtistTable';

const App = () => {

  const [tokenChecked, setTokenChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const tokenValid = await authService.verifyToken();
      if (!tokenValid) {
        authService.logout();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      setTokenChecked(true);
    };

    checkToken();
  }, []);

  if (!tokenChecked) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/users" element={<PrivateRoute element={<UserTable />} />} />
        <Route path="/artists" element={<PrivateRoute element={<ArtistTable />} />} />
        {/* <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
