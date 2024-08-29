import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
            toast.error('Error fetching users');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`, { withCredentials: true });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    const handleActivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/activate/${id}`, {}, { withCredentials: true });
            toast.success('User activated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error activating user:', error);
            toast.error('Error activating user');
        }
    };

    const handleDeactivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/deactivate/${id}`, {}, { withCredentials: true });
            toast.success('User deactivated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deactivating user:', error);
            toast.error('Error deactivating user');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-image"
                 style={{
                     backgroundImage: "url('https://media.istockphoto.com/id/1915118896/photo/new-generation-abstract-empty-building-structure-with-soft-light-blue-and-yellow-color.jpg?s=2048x2048&w=is&k=20&c=adpvghuRWnveDJA7XFK2BqDWgs8xwj3TXZU3o9QydE8=')", // Replace with your image URL
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                 }}>
                <div className="container bg-white p-5 shadow rounded">
                    <h1 className="text-center text-primary mb-4">Manage All Users</h1>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleActivateUser(user._id)}
                                                className="btn btn-success btn-sm mr-2"
                                                disabled={user.status === 'active'}
                                            >
                                                Activate
                                            </button>
                                            <button 
                                                onClick={() => handleDeactivateUser(user._id)}
                                                className="btn btn-warning btn-sm mr-2"
                                                disabled={user.status === 'inactive'}
                                            >
                                                Deactivate
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
