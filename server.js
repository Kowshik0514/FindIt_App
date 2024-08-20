const express = require('express');
const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/auth');
const itemRoutes = require('./backend/routes/items'); // Import item routes
const lostitemRoutes = require('./backend/routes/lost_items');
const sizes = require('./backend/routes/sizes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/lost_items', lostitemRoutes);
app.use('/api/sizes',sizes);
// Use item routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
