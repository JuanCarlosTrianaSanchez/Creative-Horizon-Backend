import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
} from "../controllers/favoritesController.js";

const router = express.Router();

router.post("/:userId/:productId/add", addFavorite);

router.delete("/:userId/:productId/remove", removeFavorite);

router.get("/:userId", getFavorites);

router.get("/:userId/:productId/isFavorite", isFavorite);

export default router;
