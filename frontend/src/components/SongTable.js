import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import artistService from '../services/artistService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import songService from '../services/songService';
import CreateSong from './createSong';
import UpdateSong from './updateSong';

const ArtistSongsTable = () => {
  const [data, setData] = useState([]);

  const [showCreateSongModal, setShowCreateSongModal] = useState(false);
  const handleCreateSongClose = () => {
    setShowCreateSongModal(false);
  };

  const { id: artistId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await artistService.getArtistSongs(artistId);
        const enhancedData = res.data.map(song => ({
          ...song,
          deleteButton: (
            <button
              onClick={() => handleDeleteButtonClick(song.id)}
              className='p-1 hover:bg-red-600 border border-red-600 rounded'
            >
              Delete
            </button>
          ),
          updateButton: (
            <button
              onClick={() => handleUpdateButtonClick(song.id)}
              className='p-1 hover:bg-blue-600 border border-blue-600 rounded'
            >
              Update
            </button>
          ),
        }));

        setData(enhancedData);
      } catch (error) {
        console.error("Failed to fetch artist's songs:", error);
        toast.error("Failed to fetch artist's songs");
      }
    };

    fetchData();
  }, [artistId]);

  const handleDeleteButtonClick = async id => {
    try {
      await songService.deleteSong(id);
    } catch (error) {
      console.error('Failed to delete artist:', error);
    }
  };

  const [selectedSong, setSelectedSong] = useState(null);

  const handleUpdateButtonClick = id => {
    setSelectedSong(id);
  };

  const columns = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'album_name', header: 'Album Name' },
      { accessorKey: 'genre', header: 'Genre' },
      { accessorKey: 'created_at', header: 'Created At' },
      { accessorKey: 'updated_at', header: 'Updated At' },
      {
        accessorKey: 'deleteButton',
        header: 'Actions',
        cell: props => props.value,
      },
      {
        accessorKey: 'updateButton',
        header: 'Actions',
        cell: props => props.value,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSongCreated = () => {};

  return (
    <div className='p-6 bg-gray-900 min-h-screen'>
      <h2 className='text-3xl font-bold text-white mb-6'>Songs</h2>

      <button
        onClick={() => setShowCreateSongModal(true)}
        className='mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
      >
        Create Song
      </button>
      {showCreateSongModal && (
        <CreateSong
          onClose={handleCreateSongClose}
          onSubmit={handleSongCreated}
        />
      )}

      {selectedSong && (
        <UpdateSong
          songId={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}

      <div className='overflow-x-auto bg-gray-800 rounded-lg shadow-lg'>
        <table className='min-w-full bg-gray-700 border border-gray-600 rounded-lg'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='bg-gray-600 text-white'>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className='p-4 text-left text-sm font-medium border-b border-gray-500'
                  >
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className='hover:bg-gray-600'>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className='p-4 text-sm text-gray-200 border-b border-gray-600'
                  >
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ArtistSongsTable;
