import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import artistService from '../services/artistService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ArtistSongsTable = () => {
  const [data, setData] = useState([]);
  const { id: artistId } = useParams(); // Extracting artistId from the URL
console.log("songid",artistId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await artistService.getArtistSongs(artistId);
        setData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch artist's songs:", error);
        toast.error("Failed to fetch artist's songs");
      }
    };

    fetchData();
  }, [artistId]);

  // Define columns
  const columns = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'album_name', header: 'Album Name' },
      { accessorKey: 'genre', header: 'Genre' },
      { accessorKey: 'created_at', header: 'Created At' },
      { accessorKey: 'updated_at', header: 'Updated At' },
    ],
    []
  );

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
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
      <ToastContainer />
    </div>
  );
};

export default ArtistSongsTable;
