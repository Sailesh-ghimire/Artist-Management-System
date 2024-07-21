import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:5000/api/users/';

// const getAllUsers = () => {
//   return axios.get(API_URL, { headers: authHeader() });
// };

const getAllUsers = (page = 1, limit = 5) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { page, limit },
  });
};




const createUser = (user) => {
  return axios.post(API_URL, user, { headers: authHeader() });
};

const updateUser = (id, user) => {
  return axios.put(API_URL + id, user, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
