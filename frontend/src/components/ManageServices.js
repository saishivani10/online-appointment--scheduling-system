import React, { useState, useEffect } from 'react';
import { serviceAPI, getCurrentUser } from '../api';
import '../styles/ManageServices.css';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      if (currentUser && currentUser.id) {
        const response = await serviceAPI.getByProvider(currentUser.id);
        setServices(response.data.services || []);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
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
      if (editingService) {
        await serviceAPI.update(editingService.id, formData);
        setSuccess('Service updated successfully!');
      } else {
        await serviceAPI.create(formData);
        setSuccess('Service created successfully!');
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        image: ''
      });
      setShowForm(false);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      image: service.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      await serviceAPI.delete(serviceId);
      setSuccess('Service deleted successfully!');
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete service');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="manage-services-container">
      <div className="services-header">
        <h2>Manage Services</h2>
        {!showForm && (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            + Add New Service
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <div className="service-form">
          <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Service Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Haircut, Massage, Consultation"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service..."
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="30"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Hair">Hair & Beauty</option>
                <option value="Wellness">Wellness & Spa</option>
                <option value="Fitness">Fitness & Sports</option>
                <option value="Health">Health & Medical</option>
                <option value="Dental">Dental</option>
                <option value="Consultation">Consultation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image URL (optional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="services-list">
        {services.length === 0 ? (
          <div className="no-services">
            <p>No services found. Add your first service to get started!</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                {service.image && (
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                  </div>
                )}
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-details">
                    <span className="service-price">${service.price}</span>
                    <span className="service-duration">{service.duration} min</span>
                    <span className="service-category">{service.category}</span>
                  </div>
                  <div className="service-actions">
                    <button onClick={() => handleEdit(service)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
