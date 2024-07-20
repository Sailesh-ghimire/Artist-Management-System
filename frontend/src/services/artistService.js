import axios from 'axios';

const API_URL = 'http://localhost:5000/api/artists/';

const getAllArtists = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createArtist = (artist) => {
  return axios.post(API_URL, artist, { headers: authHeader() });
};

const updateArtist = (id, artist) => {
  return axios.put(API_URL + id, artist, { headers: authHeader() });
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
