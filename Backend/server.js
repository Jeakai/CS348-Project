require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Import the createViews.js script to run it at startup
const createViews = require('./createViews');

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const favouriteRoutes = require('./routes/favRoutes');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins; adjust as necessary
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
    
  ],
  credentials: trues
}));

// Run the createViews script during app startup to ensure the view is created
createViews.createLatestPlayersView();

// Route mounting
app.use('/api', authRoutes);                    // Handles /register, /users/:id updates/deletions
app.use('/api/players', playerRoutes);          // Handles players and season stats endpoints
app.use('/api/teams', teamRoutes);              // Handles teams endpoint
app.use('/api/favourites', favouriteRoutes);    // Handles favourites endpoints
app.use('/api/users', userRoutes);              // Handles users endpoint (no need for duplicate)

// Serve static files from the 'assets' directory (root directory)
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Serve static files from the React app (ensure the path is correct for your build output)
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
