import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if there is no token
    } else {
      fetchCategories(token);
    }
  }, [navigate]);

  const fetchCategories = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/questions/approved', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const questions = response.data;

      const uniqueCategories = [
        ...new Set(questions.map((question) => question.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
      // Redirect to login if the token is invalid or an error occurs
      navigate('/login');
    }
  };

  return (
    <>
      <header style={{
        position: 'relative',
        padding: '20px 0',
        background: 'linear-gradient(90deg, rgba(136, 45, 179, 1) 0%, rgba(237, 144, 250, 1) 100%)',
        color: '#fff',
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h1>Let's Learn Something New Everyday</h1>
      </header>

      <div className="container my-5">
        <section className="text-center mb-5" style={{
          padding: '40px 20px',
          background: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h1>Welcome to DoConnect</h1>
          <p>
            DoConnect is a dynamic question and answer platform designed to foster knowledge sharing and community engagement. Our platform allows users to ask questions, provide answers, and engage in meaningful discussions across various categories.
          </p>
          <p>
            Whether you're seeking expert advice or looking to share your own insights, DoConnect provides a collaborative space for learning and growth. Explore a wide range of topics, connect with like-minded individuals, and contribute to our vibrant community.
          </p>
          <img 
            src="https://media.licdn.com/dms/image/C4E1BAQHmwCLVswIo3w/company-background_10000/0/1629802933752/doconnect_cover?e=2147483647&v=beta&t=JR3LJSXxejdihwK5jfE6JcY1IPCwgVIZ9R69b5oudQQ" 
            alt="DoConnect Overview" 
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </section>

        <section className="text-center mt-5" style={{
          padding: '40px 20px',
          background: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2>About DoConnect</h2>
          <p>
            DoConnect is a comprehensive question and answer platform designed to facilitate knowledge sharing and community engagement.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '300px',
              margin: '15px',
              padding: '20px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{
                marginBottom: '15px',
                fontSize: '24px',
                color: '#333',
              }}>Our Mission</h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
              }}>
                Our mission is to provide a platform where users can freely ask and answer questions on a wide range of topics, connect with experts, and share valuable knowledge.
              </p>
            </div>
            
            <div style={{
              width: '100%',
              maxWidth: '300px',
              margin: '15px',
              padding: '20px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{
                marginBottom: '15px',
                fontSize: '24px',
                color: '#333',
              }}>Features</h3>
              <ul style={{
                listStyle: 'none',
                padding: '0',
              }}>
                <li style={{
                  fontSize: '16px',
                  color: '#666',
                }}>Ask and answer questions on various topics.</li>
                <li style={{
                  fontSize: '16px',
                  color: '#666',
                }}>Upload images to enhance your questions and answers.</li>
                <li style={{
                  fontSize: '16px',
                  color: '#666',
                }}>Search questions by topic or query string.</li>
                <li style={{
                  fontSize: '16px',
                  color: '#666',
                }}>Real-time group chat for effective communication.</li>
                <li style={{
                  fontSize: '16px',
                  color: '#666',
                }}>Admin features for content approval and user management.</li>
              </ul>
            </div>
            
            <div style={{
              width: '100%',
              maxWidth: '300px',
              margin: '15px',
              padding: '20px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{
                marginBottom: '15px',
                fontSize: '24px',
                color: '#333',
              }}>Admin Responsibilities</h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
              }}>
                Admins are notified via email whenever new content is added. They have the ability to approve or delete questions and answers, and manage users to ensure a positive experience on the platform.
              </p>
            </div>
            
            <div style={{
              width: '100%',
              maxWidth: '300px',
              margin: '15px',
              padding: '20px',
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{
                marginBottom: '15px',
                fontSize: '24px',
                color: '#333',
              }}>Technology Stack</h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
              }}>
                DoConnect is built using Angular for the frontend, Spring Boot for the backend, and MySQL for the database. This tech stack ensures a robust, scalable, and secure application.
              </p>
            </div>
          </div>
        </section>

        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <div className="card" onClick={() => navigate(`/listquestions/${category}`)} style={{ cursor: 'pointer', border: 'none', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{
                    background: 'linear-gradient(90deg, rgba(136, 45, 179, 1) 0%, rgba(237, 144, 250, 1) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}>
                    {category}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
