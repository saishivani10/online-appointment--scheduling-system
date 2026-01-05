import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getToken, getCurrentUser } from '../api';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📅 Slotify
        </Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/book-appointment">Book Appointment</Link>
              <Link to="/providers">Providers</Link>
              {currentUser?.role === 'provider' && (
                <Link to="/manage-services">Manage Services</Link>
              )}
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
