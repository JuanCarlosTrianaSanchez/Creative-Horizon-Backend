const express = require("express");
const router = express.Router();
const {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
} = require("../controllers/favoritesController");

router.post("/:userId/:productId/add", addFavorite);

router.delete("/:userId/:productId/remove", removeFavorite);

router.get("/:userId", getFavorites);

router.get("/:userId/:productId/isFavorite", isFavorite);

module.exports = router;
