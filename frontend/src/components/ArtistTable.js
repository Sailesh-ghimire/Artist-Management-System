import React, { useEffect, useCallback, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import artistService from '../services/artistService';
import { Link } from 'react-router-dom';
import CreateArtist from './createArtist';
import UpdateArtist from './updateArtist';
import { toast, ToastContainer } from 'react-toastify';

const ArtistTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showCreateArtistModal, setShowCreateArtistModal] = useState(false);

  const handleDeleteButtonClick = useCallback(
    async id => {
      try {
        await artistService.deleteArtist(id);
        fetchData(currentPage);
        toast.success('Delete Successful');
      } catch (error) {
        console.error('Failed to delete artist:', error);
        toast.error('Failed to delete artist');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const handleUpdateButtonClick = useCallback(
    id => {
      setSelectedArtist(id);
      fetchData(currentPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const fetchData = useCallback(
    async page => {
      try {
        const res = await artistService.getAllArtists(page);
        const formattedData = res.data.artists.map(artist => ({
          ...artist,
          dob: new Date(artist.dob).toISOString().split('T')[0],
          deleteButton: (
            <button
              onClick={() => handleDeleteButtonClick(artist.id)}
              className='p-1 hover:bg-red-600 border border-red-600 rounded'
            >
              Delete
            </button>
          ),
          updateButton: (
            <button
              onClick={() => handleUpdateButtonClick(artist.id)}
              className='p-1 hover:bg-blue-600 border border-blue-600 rounded'
            >
              Update
            </button>
          ),
          songsButton: (
            <Link to={`/songs/${artist.id}`}>
              <button className='p-1 hover:bg-blue-500 text-white rounded'>
                View Songs
              </button>
            </Link>
          ),
        }));
        setData(formattedData);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch artists:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleDeleteButtonClick, handleUpdateButtonClick]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleArtistCreated = useCallback(() => {
    fetchData(currentPage);
    toast.success(' Successful');

    setShowCreateArtistModal(false);
  }, [currentPage, fetchData]);

  const columns = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'dob', header: 'DOB' },
      { accessorKey: 'gender', header: 'Gender' },
      { accessorKey: 'address', header: 'Address' },
      { accessorKey: 'first_release_year', header: 'First Release Year' },
      {
        accessorKey: 'no_of_albums_released',
        header: 'Number of Albums Released',
      },
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
      {
        accessorKey: 'songsButton',
        header: 'Songs By Artists',
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

  const nextPage = () =>
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <div className='p-6 bg-gray-900 min-h-screen'>
      <ToastContainer />
      <h2 className='text-3xl font-bold text-white mb-6'>Artists</h2>

      <button
        onClick={() => setShowCreateArtistModal(true)}
        className='mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
      >
        Create Artist
      </button>

      {showCreateArtistModal && (
        <CreateArtist
          onClose={() => setShowCreateArtistModal(false)}
          onSubmit={handleArtistCreated}
        />
      )}

      {selectedArtist && (
        <UpdateArtist
          artistId={selectedArtist}
          onClose={() => setSelectedArtist(null)}
          onSubmit={() => fetchData(currentPage)}
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
                    className='p-4 text-center text-sm font-medium border-b border-gray-500'
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
                    className='p-4 text-center text-sm text-gray-200 border-b border-gray-600'
                  >
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-6 space-x-4'>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='p-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300'
        >
          Previous
        </button>
        <span className='text-white text-lg'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='p-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtistTable;
