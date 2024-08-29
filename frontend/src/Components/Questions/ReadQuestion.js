import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ReadQuestion.css'; // Import the CSS file

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const token = localStorage.getItem('token'); // Get the token directly from local storage

    useEffect(() => {
        fetchQuestion();
    }, []);

    function fetchQuestion() {
        axios.get(`http://localhost:5000/questions/id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header if needed
            },
        })
        .then(response => {
            setQuestion(response.data);
        })
        .catch(error => {
            console.log('There was an error fetching the Questions data!', error);
        });
    }

    return (
        <div className="container my-5">
            <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={() => window.history.back()}>
                Back
            </button>
            <div className="card shadow-sm">
                {question ? (
                    <div className="card-body">
                        <div className="question-header">
                            <h5 className="card-title">Question No: {question._id}</h5>
                        </div>
                        <h1 className="question-text">Question: {question.questiontext}</h1>
                        {question.image && (
                            <img
                                src={question.image}
                                alt="Screenshot of doubt"
                                className="img-fluid mb-3"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                        <p className="card-text"><b>Description:</b> {question.description}</p>
                        <p className="card-text"><b>Status:</b> {question.status}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="loading">Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReadQuestion;
