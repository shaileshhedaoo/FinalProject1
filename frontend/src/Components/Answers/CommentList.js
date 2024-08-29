import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentList() {
  const { ansid } = useParams(); // Ensure `ansid` matches the parameter in the route
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/answer/${ansid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }, [ansid, token]); // Include ansid and token as dependencies

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Only depend on fetchComments

  return (
    <div className="container my-4">
      <h3 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: 'monospace' }}>
        Comments for Answer
      </h3>
      <ul className="list-group">
        {comments.map(comment => (
          <li key={comment._id} className="list-group-item">
            {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
