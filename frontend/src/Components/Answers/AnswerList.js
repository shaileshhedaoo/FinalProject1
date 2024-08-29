import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnswerList() {
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateText, setUpdateText] = useState('');
    const [editingAnswerId, setEditingAnswerId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Fetch all answers
    const fetchAnswers = useCallback(() => {
        const ans = 'http://localhost:5000/api/answers/answers';
        const ques = 'http://localhost:5000/questions/';
        const user = 'http://localhost:5000/users/';
        
        axios.get(ans, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setAnswers(response.data);
            setError(null);
        })
        .catch(() => {
            setError("Failed to fetch answers.");
        });

        axios.get(user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setUsers(response.data);
            setError(null);
        })
        .catch(() => {
            setError("Failed to fetch users.");
        });

        axios.get(ques, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setQuestions(response.data);
            setError(null);
        })
        .catch(() => {
            setError("Failed to fetch questions.");
        });
    }, [token]);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    // Handle answer deletion
    const deleteAnswer = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this answer?");
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/api/answers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setAnswers(prevAnswers => prevAnswers.filter(answer => answer._id !== id));
                alert("Answer deleted successfully.");
            })
            .catch(() => {
                alert("Failed to delete the answer.");
            });
        }
    };

    // Handle edit button click
    const handleEditClick = (answer) => {
        setEditingAnswerId(answer._id);
        setUpdateText(answer.answertext);
    };

    // Handle answer update
    const handleUpdate = () => {
        const endpoint = `http://localhost:5000/api/answers/${editingAnswerId}`;
        axios.put(endpoint, { answertext: updateText }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setAnswers(answers.map(answer =>
                answer._id === editingAnswerId ? response.data : answer
            ));
            setEditingAnswerId(null);
            setUpdateText('');
            alert("Answer updated successfully.");
        })
        .catch(() => {
            setError("Failed to update the answer.");
        });
    };

    // Handle answer approval
    const handleApprove = (id) => {
        axios.put(`http://localhost:5000/api/answers/approve/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setAnswers(answers.map(answer =>
                answer._id === id ? { ...answer, isapproved: true } : answer
            ));
            alert("Answer approved successfully.");
        })
        .catch(() => {
            alert("Failed to approve the answer.");
        });
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="container mt-4">
                <h2>All Answers</h2>
                <p>Check out the answers submitted by users.</p>
                {loading && <p style={{ textAlign: 'center' }}>Loading answers...</p>}
                {error && <p style={{ textAlign: 'center' }}>{error}</p>}
                {!loading && !error && answers.length === 0 && (
                    <p style={{ textAlign: 'center' }}>No answers found.</p>
                )}
                <div className="row">
                    {answers.map(answer => (
                        <div className="col-md-4 mb-4" key={answer._id}>
                            <div className="card hover-card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{answer.answertext}</h5>
                                    <p className="card-text">Approved: {answer.isapproved ? "Yes" : "No"}</p>
                                    {questions.map(q => (
                                        <div key={q._id}>
                                            {answer.questionId === q._id && (
                                                <p className="card-text mb-2"><strong>Question:</strong> {q.questiontext}</p>
                                            )}
                                        </div>
                                    ))}
                                    {users.map(u => (
                                        <div key={u._id}>
                                            {answer.userId === u._id && (
                                                <p className="card-text mb-2"><strong>User Name:</strong> {u.username}</p>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#modal${answer._id}`}
                                        onClick={() => handleEditClick(answer)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className="modal fade" id={`modal${answer._id}`} tabIndex="-1" aria-labelledby={`modalLabel${answer._id}`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header bg-primary text-white">
                                            <h5 className="modal-title" id={`modalLabel${answer._id}`}>{answer.answertext}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-flex flex-column align-items-center">
                                                <div className="text-center mb-4">
                                                    <i className="fas fa-quote-left fa-2x text-primary"></i>
                                                </div>
                                                {questions.map(q => (
                                                    <div key={q._id}>
                                                        {answer.questionId === q._id && (
                                                            <p className="card-text mb-2"><strong>Question:</strong> {q.questiontext}</p>
                                                        )}
                                                    </div>
                                                ))}
                                                <p className="card-text mb-2"><strong>Answer:</strong> {answer.answertext}</p>
                                                <p className="card-text mb-2"><strong>Approved:</strong> {answer.isapproved ? "Yes" : "No"}</p>
                                                {users.map(u => (
                                                    <div key={u._id}>
                                                        {answer.userId === u._id && (
                                                            <p className="card-text mb-2"><strong>User Name:</strong> {u.username}</p>
                                                        )}
                                                    </div>
                                                ))}
                                                {/* Update input field */}
                                                {editingAnswerId === answer._id && (
                                                    <div className="form-group mt-4">
                                                        <label htmlFor="updateAnswerText">Update Answer Text:</label>
                                                        <input
                                                            type="text"
                                                            id="updateAnswerText"
                                                            className="form-control"
                                                            value={updateText}
                                                            onChange={(e) => setUpdateText(e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {editingAnswerId === answer._id && (
                                                <>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-success"
                                                        onClick={handleUpdate}
                                                        data-bs-dismiss="modal"
                                                        disabled={!updateText}
                                                    >
                                                        <i className="fas fa-check"></i> Confirm Update
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                type="button" 
                                                className="btn btn-danger ms-2" 
                                                data-bs-dismiss="modal" 
                                                onClick={() => deleteAnswer(answer._id)}
                                            >
                                                <i className="fas fa-trash-alt"></i> Delete
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-warning ms-2" 
                                                onClick={() => handleApprove(answer._id)}
                                                disabled={answer.isapproved}
                                            >
                                                <i className="fas fa-check-circle"></i> Approve
                                            </button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                <i className="fas fa-times"></i> Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AnswerList;
