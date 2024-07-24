import axios from 'axios';
import { authHeader } from './auth-header';


const API_URL = 'http://localhost:5000/api/artists/';

const getAllArtists = (page = 1, limit = 5) => {
  return axios.get(API_URL, { 
    headers: authHeader(),
    params: { page, limit },
   });
};

const createArtist = (artist) => {
  return axios.post(API_URL, artist, { headers: authHeader() });
};



// const updateArtist = (id, artist) => {
//   return axios.put(API_URL + id, artist, { headers: authHeader() });
// };

const updateArtist = async (id, artistData) => {
  // const response = await axios.put(API_URL+id, userData, { headers: authHeader() });
  const response = await axios.put(API_URL+id, artistData, { headers: authHeader() });
  return response.data;
};

const deleteArtist = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const getArtistSongs = (artist_id) => {
  return axios.get(API_URL + artist_id + '/songs', { headers: authHeader() });
};

export default {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getArtistSongs,
};
