import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AnswerDetail() {
  const { id } = useParams();
  const [answer, setAnswer] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAnswerDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/answers/id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswer(response.data);
      setLikes(response.data.likes.length);
    } catch (error) {
      console.error('Error fetching answer details', error);
    }
  }, [id, token]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAnswerDetails();
    fetchComments();
  }, [fetchAnswerDetails, fetchComments]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/answers/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(prevLikes => prevLikes + 1);
    } catch (error) {
      console.error('Error liking the answer', error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/answers/dislike/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(prevLikes => prevLikes - 1);
    } catch (error) {
      console.error('Error unliking the answer', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:5000/api/comments/answer/${id}`, { comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments(); // Refresh the comments after adding a new one
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <div className="container my-4">
      {answer ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{answer.answertext}</h2>
            <p className="card-text">Likes: {likes}</p>
            <div className="d-flex justify-content-start mb-3">
              <button
                className="btn btn-primary me-2"
                onClick={handleLike}
              >
                Like
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleUnlike}
              >
                Unlike
              </button>
            </div>

            <h3>Comments</h3>
            <ul className="list-group mb-3">
              {comments.map(c => (
                <li key={c._id} className="list-group-item">{c.comment}</li>
              ))}
            </ul>

            <div className="input-group">
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button
                className="btn btn-success ms-2"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading answer details...</p>
      )}
    </div>
  );
}

export default AnswerDetail;
