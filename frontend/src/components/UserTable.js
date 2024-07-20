import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
  });

  useEffect(() => {
    userService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.createUser(newUser).then((res) => {
      setUsers([...users, res.data]);
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
      });
    });
  };

  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={newUser.dob}
          onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
        />
        <select
          value={newUser.gender}
          onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        ></textarea>
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
