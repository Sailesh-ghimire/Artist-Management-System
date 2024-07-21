import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import userService from '../services/userService';

const UserTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // useEffect(() => {
  //   userService.getAllUsers().then((res) => {
  //     const enhancedData = res.data.map(user => ({
  //       ...user,
  //       // action: `Action on ${user.id}`, // Manually adding the "action" property
  //       deleteButton: (
  //         <button onClick={() => handleDeleteButtonClick(user.id)}>Delete</button>
  //       ),
  //     }));
  //     setData(enhancedData);
  //   });
  // }, []);

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
      }));
      setData(enhancedData);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // const handleDeleteButtonClick = async (id) => {
  //   try {
  //     await userService.deleteUser(id);
  //     userService.getAllUsers().then(updatedUsers => {
  //       const newData = updatedUsers.data.map(user => ({
  //         ...user,
  //         deleteButton: (
  //           <button onClick={() => handleDeleteButtonClick(user.id)}>Delete</button>
  //         ),
  //       }));
  //       setData(newData); 
  //     });
  //   } catch (error) {
  //     console.error("Failed to delete user:", error);
  //     // Handle error, e.g., show an error message
  //   }
  // };

  const handleDeleteButtonClick = async (id) => {
    try {
      await userService.deleteUser(id);
      fetchData(currentPage); // Refresh data after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
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
      // {
      //   id: 'actions',
      //   header: 'Actions',
      //   cell: ({ row }) => (
      //     <div className="flex space-x-2">
      //       {row.original.deleteButton}
      //     </div>
      //   ),
      // },
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
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
