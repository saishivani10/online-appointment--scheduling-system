import React, { useState, useEffect } from 'react';
import { userAPI, serviceAPI, appointmentAPI } from '../api';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await userAPI.getProviders();
      setProviders(response.data.providers || []);
    } catch (err) {
      setError('Failed to load providers');
      console.error('Error fetching providers:', err);
    }
  };

  const handleProviderChange = async (e) => {
    const providerId = e.target.value;
    setSelectedProvider(providerId);
    setSelectedService('');
    
    if (!providerId) {
      setServices([]);
      return;
    }

    try {
      const response = await serviceAPI.getByProvider(providerId);
      setServices(response.data.services || []);
    } catch (err) {
      setError('Failed to load services');
      console.error('Error fetching services:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const appointmentData = {
        providerId: selectedProvider,
        serviceId: selectedService,
        ...formData
      };

      await appointmentAPI.create(appointmentData);
      setSuccess('Appointment booked successfully!');
      setFormData({ date: '', startTime: '', endTime: '', notes: '' });
      setSelectedProvider('');
      setSelectedService('');
      setServices([]);
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h2>Book an Appointment</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Provider</label>
          <select value={selectedProvider} onChange={handleProviderChange} required>
            <option value="">Choose a provider</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProvider && (
          <div className="form-group">
            <label>Select Service</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
              <option value="">Choose a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price} ({service.duration} min)
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests or notes..."
          />
        </div>

        <button type="submit" disabled={loading || !selectedProvider || !selectedService}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
