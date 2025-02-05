const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/status', authController.checkStatus);
router.post('/register', authController.register);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
