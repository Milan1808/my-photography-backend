const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // For allowing cross-origin requests from your frontend

// Load environment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
// Allow requests from your frontend origin
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourfrontenddomain.com' : 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true,
}));

// Import routes
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Photography Booking Backend API is running...');
});

// Error handling middleware (optional but good practice)
// This should be at the very end of your middleware stack
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Don't send stack in production
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//for commit purpose changes shifted created files to to envBackend
