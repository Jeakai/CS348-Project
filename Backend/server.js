require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const favouriteRoutes = require('./routes/favRoutes');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes'); 


// Middleware to parse JSON bodies
app.use(express.json());

// Route mounting
app.use('/api', authRoutes);                    // Handles /register, /users/:id updates/deletions
app.use('/api/players', playerRoutes);          // Handles players and season stats endpoints
app.use('/api/teams', teamRoutes);              // Handles teams endpoint
app.use('/api/favourites', favouriteRoutes);    // Handles favourites endpoints
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/users', userRoutes);

// Serve static files from the 'assets' directory (root directory)
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
