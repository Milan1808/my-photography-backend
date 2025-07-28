const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService } = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import admin middleware

router.route('/')
  .get(getServices) // Anyone can view services
  .post(protect, admin, createService); // Only admin can create services

router.route('/:id').get(getServiceById); // Anyone can view a single service

module.exports = router;