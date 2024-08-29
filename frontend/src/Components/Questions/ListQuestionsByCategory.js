import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ListQuestionsByCategory.css'; // Import the CSS file for custom styles

function ListQuestionsByCategory() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem('token'); // Get the token from local storage

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchQuestionsByCategory();
  }, [category]); // Add `category` as a dependency to avoid repeated API calls

  const fetchQuestionsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/questions/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions by category', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between mb-4">
        <button type="button" className="btn btn-primary" onClick={handleGoBack}>
          Back
        </button>
        <h2 className="border-bottom pb-2 mb-0" style={{ fontWeight: 600, fontFamily: "monospace" }}>Questions</h2>
      </div>
      <div className="row">
        {questions.map(question => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={question._id}>
            <div className="card border-primary h-100">
              <div className="card-header text-center bg-primary text-white">
                <h5 className="mb-0">Question</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: "monospace" }}>
                  {question.questiontext}
                </h5>
                <div className="d-flex justify-content-between mt-auto">
                  <button className="btn btn-secondary" onClick={() => { navigate(`/readquestion/${question._id}`) }}>
                    Description
                  </button>
                  <button 
                    className="btn btn-success" 
                    onClick={() => navigate(`/createanswer/${question._id}`)} 
                  >
                    Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListQuestionsByCategory;
