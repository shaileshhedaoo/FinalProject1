import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnswerList() {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [updatedAnswerText, setUpdatedAnswerText] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchAnswers = useCallback(() => {
        const endpoint = 'http://localhost:5000/api/answers/answers';

        setLoading(true);
        axios.get(endpoint, {
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
        })
        .finally(() => {
            setLoading(false);
        });
    }, [token]);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/answers/${editingAnswer._id}`, { answertext: updatedAnswerText }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            fetchAnswers(); // Refresh the list after update
            setEditingAnswer(null); // Close the modal
        })
        .catch(() => {
            setError("Failed to update answer.");
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
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#modal${answer._id}`}
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
                                                <p className="card-text mb-2"><strong>Answer:</strong> {answer.answertext}</p>
                                                <p className="card-text mb-2"><strong>Approved:</strong> {answer.isapproved ? "Yes" : "No"}</p>
                                                <p className="card-text mb-2"><strong>Created by:</strong> {answer.user}</p>
                                            </div>
                                            {editingAnswer && editingAnswer._id === answer._id && (
                                                <form onSubmit={handleUpdate}>
                                                    <div className="mb-3">
                                                        <label htmlFor="answerText" className="form-label">Answer Text</label>
                                                        <textarea
                                                            id="answerText"
                                                            className="form-control"
                                                            rows="4"
                                                            value={updatedAnswerText}
                                                            onChange={(e) => setUpdatedAnswerText(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Update Answer</button>
                                                </form>
                                            )}
                                        </div>
                                        <div className="modal-footer">
                                            <button 
                                                type="button" 
                                                className="btn btn-warning me-2" 
                                                data-bs-dismiss="modal" 
                                                onClick={() => {
                                                    setEditingAnswer(answer);
                                                    setUpdatedAnswerText(answer.answertext);
                                                }}
                                            >
                                                <i className="fas fa-edit"></i> Update
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-danger ms-2" 
                                                data-bs-dismiss="modal" 
                                                onClick={() => {/* Delete function here */}}
                                            >
                                                <i className="fas fa-trash-alt"></i> Delete
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
