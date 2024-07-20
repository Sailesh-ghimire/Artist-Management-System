import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (user) => {
  return axios.post(API_URL + 'register', user);
};

const login = (user) => {
  return axios.post(API_URL + 'login', user).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const verifyToken = async () => {
  const user = getCurrentUser();
  if (user && user.token) {
    try {
      const response = await axios.get(API_URL + 'verify-token', {
        headers: authHeader()
      });
      return response.data.valid;
    } catch (error) {
      logout();
      return false;
    }
  }
  return false;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyToken
};

export default authService;