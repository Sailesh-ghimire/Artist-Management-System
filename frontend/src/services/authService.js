import axios from 'axios';

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

export default {
  register,
  login,
  logout,
};
