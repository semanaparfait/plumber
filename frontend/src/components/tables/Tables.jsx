import React, { useState, useEffect } from 'react';

function Tables() {
  const [activetab, setActivetab] = useState("users");

  // Users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://einstein-plumbers1.onrender.com/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  // Admins
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    fetch('https://einstein-plumbers1.onrender.com/api/admin/admins')
      .then(res => res.json())
      .then(data => setAdmin(data))
      .catch(err => console.error('Error fetching admins:', err));
  }, []);

  // Handle status change
  const handleStatusChange = async (userId, value) => {
    const newStatus = value === 'admin';

    try {
      const response = await fetch(`https://einstein-plumbers1.onrender.com/api/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_admin: newStatus }),
      });

      if (response.ok) {
        // Update local state so table reflects change immediately
        const updateList = activetab === "users" ? users.map(u => u.id === userId ? { ...u, is_admin: newStatus } : u)
                                                : admin.map(u => u.id === userId ? { ...u, is_admin: newStatus } : u);
        activetab === "users" ? setUsers(updateList) : setAdmin(updateList);
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
    }
  };
// deleting user
const handleDelete = async (userId) => {
  try {
    const response = await fetch(`https://einstein-plumbers1.onrender.com/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove user from state so table updates immediately
      if (activetab === 'users') {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        setAdmin(admin.filter(u => u.id !== userId));
      }
    } else {
      console.error('Failed to delete user');
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      {/* Tabs */}
      <div className='flex gap-4 items-center justify-center font-black text-3xl cursor-pointer'>
        <h1 onClick={() => setActivetab("users")}>Users</h1>
        <h1 onClick={() => setActivetab("admins")}>Admins</h1>
      </div>
      <br /><br />

      {/* Users Table */}
      {activetab === 'users' && (
        <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>UserId</th>
                <th>Created_At</th>
                <th>Username</th>
                <th>Phonenumber</th>
                <th>Password</th>
                <th>Is_Admin</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.username}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.password}</td>
                  <td>{user.is_admin ? 'Admin' : 'User'}</td>
                  <td>
                    <select
                      className='border text-center'
                      value={user.is_admin ? 'admin' : 'user'}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    >
                      <option value="">status</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admins Table */}
      {activetab === 'admins' && (
        <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
            <thead className='bg-gray-100'>
              <tr>
                <th>UserId</th>
                <th>Created_At</th>
                <th>Username</th>
                <th>Phonenumber</th>
                <th>Password</th>
                <th>Is_Admin</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {admin.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.username}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.password}</td>
                  <td>{user.is_admin ? 'Admin' : 'User'}</td>
                  <td>
                    <select
                      className='border text-center'
                      value={user.is_admin ? 'admin' : 'user'}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    >
                      <option value="">status</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  </td>
                  <td className='text-red-600'>
                    <i className="fa-solid fa-trash" onClick={() => handleDelete(user.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Tables;
