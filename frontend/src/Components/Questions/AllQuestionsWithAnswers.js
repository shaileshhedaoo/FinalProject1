import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [message, setMessage] = useState('');
    const [likes, setLikes] = useState({});
    const [answerLikes, setAnswerLikes] = useState({});
    const [comments, setComments] = useState({});
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchQuestions(token);
            fetchAnswers(token);
        }
    }, [navigate]);

    const fetchQuestions = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/questions', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const questions = response.data;
            setQuestions(questions);

            const initialLikes = {};
            questions.forEach(question => {
                initialLikes[question._id] = question.likes ? question.likes.length : 0;
            });
            setLikes(initialLikes);

            if (questions.length === 0) {
                setMessage('No questions found.');
            }
        } catch (error) {
            handleFetchError(error);
        }
    };

    const fetchAnswers = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/answers/answers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedAnswers = response.data;
            setAnswers(fetchedAnswers);

            const initialComments = {};
            fetchedAnswers.forEach(answer => {
                initialComments[answer._id] = answer.comments || [];
            });
            setComments(initialComments);

            const initialAnswerLikes = {};
            fetchedAnswers.forEach(answer => {
                initialAnswerLikes[answer._id] = answer.likes ? answer.likes.length : 0;
            });
            setAnswerLikes(initialAnswerLikes);
        } catch (error) {
            setMessage('Failed to fetch answers.');
            console.error('Error:', error);
        }
    };

    const handleFetchError = (error) => {
        if (error.response?.status === 401) {
            setMessage('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            setMessage('Error fetching data.');
            console.error('Error:', error);
        }
    };

    const handleAnswerLike = async (answerId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/answers/like/${answerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAnswerLikes(prevLikes => ({
                ...prevLikes,
                [answerId]: (prevLikes[answerId] || 0) + 1
            }));
        } catch (error) {
            console.error('Error liking the answer', error);
        }
    };

    const handleAnswerDislike = async (answerId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/answers/unlike/${answerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAnswerLikes(prevLikes => ({
                ...prevLikes,
                [answerId]: Math.max((prevLikes[answerId] || 0) - 1, 0)
            }));
        } catch (error) {
            console.error('Error disliking the answer', error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!selectedAnswer || !newComment.trim()) return;

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:5000/comments/comment/${selectedAnswer._id}`, 
                { comment: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setComments(prevComments => ({
                ...prevComments,
                [selectedAnswer._id]: [...(prevComments[selectedAnswer._id] || []), response.data.comment]
            }));

            setNewComment('');
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error submitting comment', error);
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setNewComment('');
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '15px',
        marginBottom: '20px',
    };

    const cardTitleStyle = {
        fontSize: '1.25rem',
        marginBottom: '10px',
    };

    const alertStyle = {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#d9edf7',
        color: '#31708f',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const rowStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
    };

    const colStyle = {
        flex: '1 1 calc(33.333% - 20px)',
        boxSizing: 'border-box',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>All Questions</h1>
            {message && <div style={alertStyle}>{message}</div>}

            {questions.length > 0 ? (
                <div style={rowStyle}>
                    {questions.map((question) => (
                        <div key={question._id} style={colStyle}>
                            <div style={cardStyle}>
                                <h5 style={cardTitleStyle}>{question.questiontext}</h5>
                                <p><strong>Category:</strong> {question.category}</p>
                        
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#answersModal${question._id}`}
                                    onClick={() => setSelectedQuestion(question)}
                                >
                                    View Answers
                                </button>
                            </div>

                            <div className="modal fade" id={`answersModal${question._id}`} tabIndex="-1" aria-labelledby={`answersModalLabel${question._id}`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header bg-primary text-white">
                                            <h5 className="modal-title" id={`answersModalLabel${question._id}`}>Answers for {question.questiontext}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {answers.filter(answer => answer.questionId === question._id).map(answer => (
                                                <div key={answer._id} style={cardStyle}>
                                                    <p><strong>Answer:</strong> {answer.answertext}</p>
                                                    <p><strong>Likes:</strong> {answerLikes[answer._id] || 0}</p>
                                                    <button onClick={() => handleAnswerLike(answer._id)} className="btn btn-success btn-sm me-2">Like</button>
                                                    <button onClick={() => handleAnswerDislike(answer._id)} className="btn btn-danger btn-sm">Dislike</button>
                                                    <button onClick={() => handleAnswerSelect(answer)} className="btn btn-info btn-sm me-2">Add Comment</button>
                                                    {comments[answer._id] && comments[answer._id].map((comment, index) => (
                                                        <div key={index} className="alert alert-info mt-2">
                                                            {comment.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                            {selectedAnswer && (
                                                <div className="mt-3">
                                                    <textarea
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        rows="3"
                                                        className="form-control"
                                                        placeholder="Add a comment"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleCommentSubmit}
                                                        className="btn btn-primary mt-2"
                                                    >
                                                        Submit Comment
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={alertStyle}>No questions available.</div>
            )}
        </div>
    );
};

export default AllQuestions;
