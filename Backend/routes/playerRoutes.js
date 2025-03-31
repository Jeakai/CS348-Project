const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getPlayers);
router.get('/latest', playerController.getLatestPlayers);
module.exports = router;
