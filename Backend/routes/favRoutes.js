const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favController');

router.get('/:id', favouriteController.getUserFavourites);
router.put('/:id', favouriteController.updateUserFavourites);

module.exports = router;
