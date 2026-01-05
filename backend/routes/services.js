const express = require('express');
const Service = require('../models/Service');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { isActive: true },
      include: [{ model: User, as: 'provider', attributes: ['id', 'name', 'email', 'phone'] }]
    });

    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get services by provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const services = await Service.findAll({
      where: {
        providerId: req.params.providerId,
        isActive: true
      }
    });

    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create service
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, price, duration, category } = req.body;

    if (!name || !description || !price || !duration || !category) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const service = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      providerId: req.user.id
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update service
router.put('/:id', protect, async (req, res) => {
  try {
    let service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (service.providerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this service' });
    }

    await service.update(req.body);

    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete service
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (service.providerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this service' });
    }

    await service.update({ isActive: false });

    res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
