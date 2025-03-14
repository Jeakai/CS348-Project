const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favController');

router.get('/:id', favouriteController.getUserFavourites);
router.post('/:uid', favouriteController.addFavourite);
router.delete('/:uid/:pid', favouriteController.removeFavourite);
// router.put('/:id/toggle', favouriteController.toggleUserFavourite);

module.exports = router;
