import axios from 'axios';

const API_URL = 'http://localhost:5000/api/songs';

const getSongsByArtist = (artistId) => {
  return axios.get(`${API_URL}/artist/${artistId}`);
};

const createSong = (songData) => {
  return axios.post(API_URL, songData);
};

const updateSong = (id, songData) => {
  return axios.put(`${API_URL}/${id}`, songData);
};

const deleteSong = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getSongsByArtist,
  createSong,
  updateSong,
  deleteSong,
};
