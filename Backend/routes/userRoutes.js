const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for JWT verification

router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
