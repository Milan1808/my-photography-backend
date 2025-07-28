const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a service (Admin only)
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { name, description, price, durationMinutes, category, imageUrl } = req.body;

  if (!name || !description || !price || !durationMinutes || !category) {
    res.status(400);
    throw new Error('Please include all required fields for the service');
  }

  const service = new Service({
    name,
    description,
    price,
    durationMinutes,
    category,
    imageUrl,
    isAvailable: true,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// Add more functions as needed (updateService, deleteService)

module.exports = {
  getServices,
  getServiceById,
  createService,
};