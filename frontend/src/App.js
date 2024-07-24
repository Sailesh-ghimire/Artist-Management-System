import './index.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute';
import authService from './services/authService';
import UserTable from './components/UserTable';
import ArtistTable from './components/ArtistTable';
import Navbar from './components/Navbar';
import SongTable from './components/SongTable'
import ArtistCSVImportExport from './components/CSV';

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
    return <div>Loading...</div>; 
  }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
//         <Route path="/users" element={<PrivateRoute element={<UserTable />} />} />
//         <Route path="/artists" element={<PrivateRoute element={<ArtistTable />} />} />

//       </Routes>
//     </Router>
//   );
// };

// export default App;

return (
  <Router>
    <MainApp isAuthenticated={isAuthenticated} />
  </Router>
);
};

const MainApp = ({ isAuthenticated }) => {
const location = useLocation();
const showNavbar = !['/login', '/register'].includes(location.pathname);

return (
  <div>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/users" element={<PrivateRoute element={<UserTable />} />} />
      <Route path="/artists" element={<PrivateRoute element={<ArtistTable />} />} />
      <Route path="/songs/:id" element={<PrivateRoute element={<SongTable />} />} />
      <Route path="/csv" element={<PrivateRoute element={<ArtistCSVImportExport />} />}/>

    </Routes>
  </div>
);
};

export default App;

