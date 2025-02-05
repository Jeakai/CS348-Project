const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favController');

// Assuming favourites endpoints are under /api/users/:id/favourites
router.get('/:id/favourites', favouriteController.getUserFavourites);
router.put('/:id/favourites', favouriteController.updateUserFavourites);

module.exports = router;
