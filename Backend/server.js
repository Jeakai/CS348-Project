require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const favouriteRoutes = require('./routes/favRoutes');
const errorHandler = require('./middleware/errorHandler');

// Middleware to parse JSON bodies
app.use(express.json());

// Route mounting
app.use('/api', authRoutes);           // Handles /register, /users/:id updates/deletions
app.use('/api/players', playerRoutes);   // Handles players and season stats endpoints
app.use('/api/teams', teamRoutes);       // Handles teams endpoint
app.use('/api/users', favouriteRoutes);  // Handles favourites endpoints

// Global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
