import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import userService from '../services/userService';
import CreateUser from './createUser';
import UpdateUser from './updateUser';
import { ToastContainer, toast } from 'react-toastify';

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [userTableKey, setUserTableKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreateUserClose = () => {
    setShowCreateUserModal(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const res = await userService.getAllUsers(page);
      const enhancedData = res.data.users.map(user => ({
        ...user,
        deleteButton: (
          <button 
            onClick={() => handleDeleteButtonClick(user.id)}
            className="p-1 text-red-600 border border-red-600 rounded"
          >
            Delete
          </button>
          
        ),
        updateButton: (
          <button 
            onClick={() => handleUpdateButtonClick(user.id)}
            className="p-1 text-blue-600 border border-blue-600 rounded"
          >
            Update
          </button>
        ),
      }));
      setData(enhancedData);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");

    }
  };


  const handleDeleteButtonClick = async (id) => {
    try {
      await userService.deleteUser(id);
      fetchData(currentPage); // Refresh data after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdateButtonClick = (id) => {
    setSelectedUser(id);
    fetchData(currentPage); // Refresh data after deletion

  };



  // Define columns
  const columns = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'dob', header: 'Date of Birth' },
      { accessorKey: 'gender', header: 'Gender' },
      // { accessorKey: 'action', header: 'Actions' },
      { accessorKey: 'deleteButton', header: 'Actions', cell: props => props.value }, // Display the delete button
      { accessorKey: 'updateButton', header: 'Actions', cell: props => props.value }, // Display the delete button
      
    ],
    []
  );

  

  // Initialize the table
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

  const handleUserCreated = () => {
    // Trigger a re-render of UserTable by changing its key
    fetchData(currentPage);  };


  return (
    <div className="p-6">
            <ToastContainer />

      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <button
        onClick={() => setShowCreateUserModal(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Create User
      </button>
      {showCreateUserModal && <CreateUser onClose={handleCreateUserClose} onSubmit={handleUserCreated} />}

      {selectedUser && (
        <UpdateUser userId={selectedUser} onClose={() => setSelectedUser(null)} />
      )}


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

export default UserTable;
