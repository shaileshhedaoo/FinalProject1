import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllUsers from '../Users/AllUsers';

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
        } catch (error) {
            setMessage('Error fetching questions.');
        }
    };

    const fetchUnapprovedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/unapproved', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
        } catch (error) {
            setMessage('Error fetching unapproved questions.');
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/questions/approve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
            fetchUnapprovedQuestions();
        } catch (error) {
            setMessage('Error approving question.');
        }
    };

    const handleResolve = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/questions/resolve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
            fetchUnapprovedQuestions();
        } catch (error) {
            setMessage('Error resolving question.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
            fetchUnapprovedQuestions();
        } catch (error) {
            setMessage('Error deleting question.');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/questiontext/${searchText}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
            if (!response.data.length) {
                setMessage('No questions found for the search term.');
            }
        } catch (error) {
            setMessage('Error searching questions.');
        }
    };

    const handleFilterByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
            if (!response.data.length) {
                setMessage('No questions found for this category.');
            }
        } catch (error) {
            setMessage('Error filtering questions.');
        }
    };

    const fetchAllApprovedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/approved', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
        } catch (error) {
            setMessage('Error fetching approved questions.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Admin Questions Management</h1>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleFilterByCategory}>Filter</button>
                </div>
            </div>

            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-warning" onClick={fetchUnapprovedQuestions}>View Unapproved Questions</button>
                <button className="btn btn-success" onClick={fetchAllApprovedQuestions}>View Approved Questions</button>
            </div>

            <div className="row">
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={question._id}>
                            <div className="card h-100 shadow-sm border-light rounded">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                                        Question: {question.questiontext}
                                    </h5>
                                    <p className="card-text" style={{ fontFamily: 'Arial, sans-serif' }}>
                                        <strong>Status:</strong> {question.status}
                                    </p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-success" onClick={() => handleApprove(question._id)}>Approve</button>
                                        <button className="btn btn-info" onClick={() => handleResolve(question._id)}>Resolve</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(question._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No questions found</p>
                )}
            </div>
            <div className="mt-5">
                <AllUsers/> {/* Embed AllUsers component here */}
            </div>
        </div>
    );
};

export default AdminQuestions;
