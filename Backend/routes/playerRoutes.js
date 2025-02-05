const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getPlayers);
router.get('/:id/seasons', playerController.getPlayerSeasons);

module.exports = router;
