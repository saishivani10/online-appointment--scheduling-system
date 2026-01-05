import React, { useState, useEffect } from 'react';
import { userAPI } from '../api';
import '../styles/Providers.css';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await userAPI.getProviders();
      setProviders(response.data.providers);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="providers-container">
      <h2>Service Providers</h2>
      {providers.length === 0 ? (
        <p>No providers available</p>
      ) : (
        <div className="providers-grid">
          {providers.map(provider => (
            <div key={provider._id} className="provider-card">
              <h3>{provider.name}</h3>
              <p>Email: {provider.email}</p>
              <p>Phone: {provider.phone}</p>
              <a href={`/book-appointment?provider=${provider._id}`}>
                View Services & Book
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Providers;
