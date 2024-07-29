import React, { useCallback, useEffect, useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteButtonClick = useCallback(
    async id => {
      try {
        await userService.deleteUser(id);
        fetchData(currentPage);
        toast.success('deleted successfully');
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const handleUpdateButtonClick = useCallback(
    id => {
      setSelectedUser(id);
      fetchData(currentPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const fetchData = useCallback(
    async page => {
      try {
        const res = await userService.getAllUsers(page);
        const formattedData = res.data.users.map(user => ({
          ...user,
          dob: new Date(user.dob).toISOString().split('T')[0],
          deleteButton: (
            <button
              onClick={() => handleDeleteButtonClick(user.id)}
              className='p-1 border hover:bg-red-600 border-red-600 rounded'
            >
              Delete
            </button>
          ),
          updateButton: (
            <button
              onClick={() => handleUpdateButtonClick(user.id)}
              className='p-1 border hover:bg-blue-600 border-blue-600 rounded'
            >
              Update
            </button>
          ),
        }));
        setData(formattedData);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to fetch users');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleDeleteButtonClick, handleUpdateButtonClick]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleUserCreated = useCallback(() => {
    fetchData(currentPage);
    setShowCreateUserModal(false);
  }, [currentPage, fetchData]);

  const columns = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'dob', header: 'Date of Birth' },
      { accessorKey: 'gender', header: 'Gender' },
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

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className='p-6 bg-gray-900 min-h-screen'>
      <ToastContainer />
      <h2 className='text-3xl font-bold text-white mb-6'>Users</h2>

      <button
        onClick={() => setShowCreateUserModal(true)}
        className='mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
      >
        Create User
      </button>

      {showCreateUserModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <CreateUser
            onClose={() => setShowCreateUserModal(false)}
            onSubmit={handleUserCreated}
          />
        </div>
      )}

      {selectedUser && (
        <UpdateUser
          userId={selectedUser}
          onClose={() => setSelectedUser(null)}
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

export default UserTable;
