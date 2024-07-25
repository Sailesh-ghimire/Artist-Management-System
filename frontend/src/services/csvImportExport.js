import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:5000/api/artists/';

const csvExport = async () => {
  try {
    const response = await axios.get(
      API_URL + 'exportcsv',
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'text/csv',
        },
      },
      {
        responseType: 'blob',
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'artists.csv');
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error(err);
  }
};

const csvImport = async file => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post(API_URL + 'importcsv', formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    throw new Error('Failed to import artists');
  }
};

const csvService = {
  csvExport,
  csvImport,
};

export default csvService;
