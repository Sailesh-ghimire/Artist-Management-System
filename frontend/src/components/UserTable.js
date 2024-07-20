// import React, { useState, useEffect } from 'react';
// import { useReactTable  } from '@tanstack/react-table';
// import userService from '../services/userService';

// const UserTable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await userService.getAllUsers();
//         setData(response.data);
//       } catch (err) {
//         console.error('Failed to fetch users:', err);
//       }
//     };

//     fetchData();
//   }, []);


//   const columns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'First Name', accessor: 'first_name' },
//     { Header: 'Last Name', accessor: 'last_name' },
//     { Header: 'Email', accessor: 'email' },
//     { Header: 'Phone', accessor: 'phone' },
//     { Header: 'DOB', accessor: 'dob' },
//     { Header: 'Gender', accessor: 'gender' },
//     { Header: 'Address', accessor: 'address' },
//   ];

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useReactTable ({
//     columns,
//     data,
//   });



//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Users</h2>
//       <table {...getTableProps()} className="min-w-full bg-white border border-gray-300">
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()} className="p-2 border-b border-gray-300">
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()} className="p-2 border-b border-gray-300">
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;

import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import axios from 'axios';
import userService from '../services/userService';


const UserTable = () => {
  const [data, setData] = useState([]);
console.log(data)
  // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/users');
  //       setData(response.data);
  //     } catch (err) {
  //       console.error('Error fetching user data:', err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    userService.getAllUsers().then((res) => {
      setData(res.data);
    });
  }, []);


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
    </div>
  );
};

export default UserTable;
