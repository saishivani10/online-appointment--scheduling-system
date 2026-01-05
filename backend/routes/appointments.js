const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all appointments for user
router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { customerId: req.user.id },
          { providerId: req.user.id }
        ]
      },
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name', 'email', 'phone'] },
        { model: User, as: 'provider', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Service, as: 'service', attributes: ['id', 'name', 'price', 'duration'] }
      ]
    });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single appointment
router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name', 'email', 'phone'] },
        { model: User, as: 'provider', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Service, as: 'service' }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create appointment
router.post('/', protect, async (req, res) => {
  try {
    const { providerId, serviceId, date, startTime, endTime, notes } = req.body;

    if (!providerId || !serviceId || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const appointment = await Appointment.create({
      customerId: req.user.id,
      providerId,
      serviceId,
      date,
      startTime,
      endTime,
      notes
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update appointment
router.put('/:id', protect, async (req, res) => {
  try {
    let appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check authorization
    if (appointment.providerId !== req.user.id && appointment.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
    }

    await appointment.update(req.body);

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel appointment
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.customerId !== req.user.id && appointment.providerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
    }

    await appointment.update({ status: 'cancelled' });

    res.status(200).json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
