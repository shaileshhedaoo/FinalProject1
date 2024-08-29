import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Menu() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to login
    };

    // Check if user is logged in based on the token in localStorage
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode the token to get user info

    // Fetch user profile from the server
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserProfile(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#6c757d', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px 20px' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ fontWeight: 700, fontSize: '24px', color: '#fff' }}>DoConnect</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
                        <Link className="nav-link active" aria-current="page" to="/">
                            <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>Home</li>
                        </Link>

                        {user && user.role === 'user' && (
                            <>
                                <Link className="nav-link active" aria-current="page" to="/createquestion">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>Post Question</li>
                                </Link>
                                <Link className="nav-link active" aria-current="page" to="/listallquestions">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>Questions</li>
                                </Link>
                                <Link className="nav-link active" aria-current="page" to="/allquestions">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>All Questions with Answers</li>
                                </Link>
                            </>
                        )}

                        {user && user.role === 'admin' && (
                            <>
                                <Link className="nav-link active" aria-current="page" to="/adminquestions">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>Questions</li>
                                </Link>
                                <Link className="nav-link" to="/answerlist">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>Answers</li>
                                </Link>
                                <Link className="nav-link" to="/userProfiles">
                                    <li className="nav-item" style={{ marginRight: '20px', fontWeight: 600, color: '#fff' }}>User Profiles</li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>

                <div className="dropdown" style={{ marginRight: 20 }}>
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '20px' }}
                        onClick={fetchUserProfile}> {/* Fetch user profile on click */}
                        <span style={{ marginRight: '10px' }}>Menu</span>
                        <i className="bi bi-person-circle" style={{ fontSize: '20px' }}></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-light" style={{ backgroundColor: '#f8f9fa' }}>
                        {!user && (
                            <>
                                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                <li><Link className="dropdown-item" to="/register">Register</Link></li>
                            </>
                        )}
                        {user && userProfile && ( // Display detailed user profile
                            <>
                                <li className="dropdown-item">
                                    <strong>Username:</strong> {userProfile.username}<br />
                                    <strong>Email:</strong> {userProfile.email}<br />
                                    <strong>Status:</strong> {userProfile.status}<br />
                                    <strong>Role:</strong> {userProfile.role}<br />
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
