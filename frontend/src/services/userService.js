import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:5000/api/users/';

const getAllUsers = (page = 1, limit = 5) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { page, limit },
  });
};

const createUser = async userData => {
  const response = await axios.post(API_URL, userData, {
    headers: authHeader(),
  });
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(API_URL + id, userData, {
    headers: authHeader(),
  });
  return response.data;
};

const deleteUser = id => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
