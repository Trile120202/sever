const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoriteController');
const { verifyToken } = require("../middleware/verifyToken");

router.post('/favorites', verifyToken, addFavorite);
router.get('/favorites', verifyToken, getFavorites);
router.delete('/favorites/:productId', verifyToken, removeFavorite);

module.exports = router;
