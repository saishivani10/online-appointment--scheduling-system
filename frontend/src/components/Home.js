import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Slotify</h1>
        <p>Book and manage your appointments easily</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>📅 Easy Booking</h3>
          <p>Book appointments with just a few clicks</p>
        </div>
        <div className="feature">
          <h3>🔔 Reminders</h3>
          <p>Get timely reminders for your appointments</p>
        </div>
        <div className="feature">
          <h3>👥 Multiple Providers</h3>
          <p>Choose from various service providers</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure</h3>
          <p>Your data is safe and secure with us</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
