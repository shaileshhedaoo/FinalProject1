import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListAllQuestions() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Get the token directly from local storage

    useEffect(() => {
        fetchQuestions();
    }, []);

    function fetchQuestions() {
        axios.get(`http://localhost:5000/questions/approved/user`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
        })
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.log("Error occurred when fetching the questions", error);
        });
    }

    return (
        <div className="container my-4">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 'bold', fontFamily: "Arial, sans-serif" }}>Questions</h2>
            <div className="row">
                {questions.map(question => (
                    <div className="col-md-6 mb-4" key={question._id}>
                        <div className="card shadow-sm border-light rounded">
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 'bold', fontFamily: "Arial, sans-serif" }}>
                                    Question: {question.questiontext}
                                </h5>
                                <p className="card-text" style={{ fontFamily: "Arial, sans-serif" }}>
                                    {question.description.slice(0, 100)}{question.description.length > 100 ? '...' : ''}
                                </p>
                                {token && (
                                    <div className="d-flex justify-content-between mt-3">
                                        <button 
                                            className="btn btn-primary me-2" 
                                            onClick={() => { navigate(`/readquestion/${question._id}`) }}
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            className="btn btn-warning" 
                                            onClick={() => { navigate(`/updatequestion/${question._id}`) }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListAllQuestions;
