import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import csvImportExport from '../services/csvImportExport';

const ArtistCSVImportExport = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleExport = async () => {
    try {
      await csvImportExport.csvExport();
      toast.success('Artists exported successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export artists');
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a CSV file to upload');
      return;
    }

    try {
      await csvImportExport.csvImport(file);
      toast.success('Artists imported successfully');

      setFile(null);
      document.getElementById('fileInput').value = '';
    } catch (err) {
      console.error(err);
      toast.error('Failed to import artists');
    }
  };

  return (
    <div className='p-6 bg-gray-900 min-h-screen flex flex-col'>
      <h2 className='text-3xl font-bold text-white mb-6'>
        Import/Export Artists Data
      </h2>
      <div className='bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md'>
        <div className='mb-6'>
          {/* Export Button Section */}
          <div className='mb-4'>
            <button
              onClick={handleExport}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
            >
              Export Artists to CSV
            </button>
          </div>

          {/* Import File Input and Button Section */}
          <div className='flex items-center space-x-4'>
            <input
              id='fileInput'
              type='file'
              accept='.csv'
              onChange={handleFileChange}
              className='border border-gray-600 bg-gray-700 text-white p-2 rounded'
            />
            <button
              onClick={handleImport}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
            >
              Import CSV
            </button>
          </div>
        </div>
        <p className='text-gray-400'>
          Use the buttons above to export the list of artists to a CSV file or
          import artist data from a CSV file. Ensure the CSV file format is
          correct to avoid errors.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ArtistCSVImportExport;
