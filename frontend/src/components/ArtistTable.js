import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import artistService from "../services/artistService";
import ArtistSongsTable from "./songByArtist";
import { Link } from "react-router-dom";
import CreateArtist from "./createArtist";
import UpdateArtist from "./updateArtist";

const ArtistTable = () => {
  const [data, setData] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const res = await artistService.getAllArtists(page);
      const enhancedData = res.data.artists.map((artist) => ({
        ...artist,
        deleteButton: (
          <button
            onClick={() => handleDeleteButtonClick(artist.id)}
            className="p-1 text-red-600 border border-red-600 rounded"
          >
            Delete
          </button>
        ),
        updateButton: (
          <button 
            onClick={() => handleUpdateButtonClick(artist.id)}
            className="p-1 text-blue-600 border border-blue-600 rounded"
          >
            Update
          </button>
        ),
        songsButton: (
          <Link to={`/songs/${artist.id}`}>
            <button className="p-1 bg-blue-500 text-white rounded">
              View Songs
            </button>
          </Link>
        ),
      }));
      setData(enhancedData);
      console.log("response",enhancedData)
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

  const [selectedArtist, setSelectedArtist] = useState(null);


  const handleUpdateButtonClick = (id) => {
    setSelectedArtist(id);
    fetchData(currentPage); // Refresh data after deletion

  };


  

  const columns = React.useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "dob", header: "DOB" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "first_release_year", header: "First Release Year" },
      {
        accessorKey: "no_of_albums_released",
        header: "Number of Albums Released",
      },
      {
        accessorKey: "deleteButton",
        header: "Actions",
        cell: (props) => props.value,
      }, 
      { accessorKey: 'updateButton', header: 'Actions', cell: props => props.value }, // Display the delete button

      {
        accessorKey: "songsButton",
        header: "Songs By Artists",
        cell: (props) => props.value,

      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
  };

  console.log("Table rows:", table.getRowModel().rows); // Debugging line
  console.log("Columns:", table.getHeaderGroups()); // Debugging line

  const [showCreateArtistModal, setShowCreateArtistModal] = useState(false);
  const handleCreateArtistClose = () => {
    setShowCreateArtistModal(false);
  };
  
  const handleArtistCreated = () => {
    // Trigger a re-render of UserTable by changing its key
    fetchData(currentPage);  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <button
        onClick={() => setShowCreateArtistModal(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Create Artist
      </button>
      {showCreateArtistModal && <CreateArtist onClose={handleCreateArtistClose} onSubmit={handleArtistCreated} />}
      {selectedArtist && (
        <UpdateArtist artistId={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
      {/* {selectedUser && (
        <UpdateUser userId={selectedUser} onClose={() => setSelectedUser(null)} />
      )} */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
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
      {/* <ArtistSongsTable artistId={artistId} /> */}
      
    </div>
  );
};

export default ArtistTable;
