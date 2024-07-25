import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:5000/api/songs';

const getSongsByArtist = artistId => {
  return axios.get(`${API_URL}/artists/${artistId}/songs`, {
    headers: authHeader(),
  });
};

const getSongsCount = async () => {
  const response = await axios.get(`${API_URL}/songsCount`, {
    headers: authHeader(),
  });
  return response.data;
};

const createSong = songData => {
  return axios.post(API_URL, songData, { headers: authHeader() });
};

const updateSong = (id, songData) => {
  return axios.put(`${API_URL}/${id}`, songData, { headers: authHeader() });
};

const deleteSong = id => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const songService = {
  getSongsByArtist,
  createSong,
  updateSong,
  deleteSong,
  getSongsCount,
};

export default songService;
