import React, { useState, useEffect } from 'react';
import { appointmentAPI, getCurrentUser } from '../api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        
        const appointmentsRes = await appointmentAPI.getAll();
        setAppointments(appointmentsRes.data.appointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments yet</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div key={apt.id} className="appointment-card">
                  <h3>{apt.service?.name || 'Service'}</h3>
                  <p>Date: {apt.date ? new Date(apt.date).toLocaleDateString() : ''}</p>
                  <p>Time: {apt.startTime} - {apt.endTime}</p>
                  <p>Status: <span className={`status ${apt.status}`}>{apt.status}</span></p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <ul>
            <li><a href="/book-appointment">Book New Appointment</a></li>
            <li><a href="/providers">View Providers</a></li>
            <li><a href="/profile">Edit Profile</a></li>
            {user?.role === 'provider' && <li><a href="/manage-services">Manage Services</a></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
