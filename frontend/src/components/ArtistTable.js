import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import artistService from '../services/artistService';

const ArtistTable = () => {
  const [data, setData] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    first_release_year: '',
    no_of_albums_released: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);


  const fetchData = async (page) => {
    try {
      const res = await artistService.getAllArtists(page);
      const enhancedData = res.data.artists.map(artist => ({
        ...artist,
        deleteButton: (
          <button 
            onClick={() => handleDeleteButtonClick(artist.id)}
            className="p-1 text-red-600 border border-red-600 rounded"
          >
            Delete
          </button>
        ),
      }));
      setData(enhancedData);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch artists:", error);
    }
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      await artistService.deleteArtist(id);
      fetchData(currentPage); // Refresh data after deletion
    } catch (error) {
      console.error("Failed to delete artist:", error);
    }
  };

  const handleSubmit = (artist) => {
    console.log('submit artist:', artist);
    // Implement the edit functionality here
  };

  

  const columns = React.useMemo(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'dob', header: 'DOB' },
      { accessorKey: 'gender', header: 'Gender' },
      { accessorKey: 'address', header: 'Address' },
      { accessorKey: 'first_release_year', header: 'First Release Year' },
      { accessorKey: 'no_of_albums_released', header: 'Number of Albums Released' },
      { accessorKey: 'deleteButton', header: 'Actions', cell: props => props.value }, // Display the delete button

    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1)); // Prevent going below page 1
  };


  console.log('Table rows:', table.getRowModel().rows); // Debugging line
  console.log('Columns:', table.getHeaderGroups()); // Debugging line

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Form inputs */}
        <input
          type="text"
          placeholder="Name"
          value={newArtist.name}
          onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
          required
          className="p-2 border border-gray-300 mb-2"
        />
        <input
          type="date"
          placeholder="DOB"
          value={newArtist.dob}
          onChange={(e) => setNewArtist({ ...newArtist, dob: e.target.value })}
          className="p-2 border border-gray-300 mb-2"
        />
        <select
          value={newArtist.gender}
          onChange={(e) => setNewArtist({ ...newArtist, gender: e.target.value })}
          className="p-2 border border-gray-300 mb-2"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Address"
          value={newArtist.address}
          onChange={(e) => setNewArtist({ ...newArtist, address: e.target.value })}
          className="p-2 border border-gray-300 mb-2"
        ></textarea>
        <input
          type="number"
          placeholder="First Release Year"
          value={newArtist.first_release_year}
          onChange={(e) =>
            setNewArtist({ ...newArtist, first_release_year: e.target.value })
          }
          className="p-2 border border-gray-300 mb-2"
        />
        <input
          type="number"
          placeholder="Number of Albums Released"
          value={newArtist.no_of_albums_released}
          onChange={(e) =>
            setNewArtist({ ...newArtist, no_of_albums_released: e.target.value })
          }
          className="p-2 border border-gray-300 mb-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Add Artist</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-3 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold"
                  >
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="p-3 border-b border-gray-200 text-sm"
                  >
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtistTable;
