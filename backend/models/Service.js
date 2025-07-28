const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  durationMinutes: { // Duration of the session in minutes
    type: Number,
    required: true,
    min: 15,
  },
  category: {
    type: String,
    enum: ['Wedding', 'Portrait', 'Event', 'Commercial', 'Other'],
    default: 'Other',
  },
  imageUrl: { // URL for a representative image
    type: String,
    default: 'https://via.placeholder.com/400x300/F0F0F0/888888?text=Service',
  },
  isAvailable: { // Whether this service is currently offered
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;